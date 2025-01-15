import { fetchQuestions } from "./fetchQuestions";
import Quiz from "./quiz";

function LoadError() {
  return (
    <div className="bg-black h-screen text-white p-5">
      <div className={`flex flex-col items-center justify-center rounded-lg bg-gray-800 h-96 w-full`}>
        <p>Failed to load questions. Please try again later.</p>
      </div>
    </div>
    );
}

export default async function Page() {
  const questions = await fetchQuestions();
  const data = questions.results || [];

  return (
    <div>
      {data.length > 0 ? (
      <Quiz questions={data}/>
    ) : (
      <LoadError />)}
    </div>
  );
}
