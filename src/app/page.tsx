import { fetchQuestions } from "./fetchQuestions";
import Quiz from "./quiz";

export default async function Page() {
  const questions = await fetchQuestions();
  const data = questions.results

  return (
    <div>
      <Quiz questions={data}/>
    </div>
  );
}
