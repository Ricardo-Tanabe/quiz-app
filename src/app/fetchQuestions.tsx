export async function fetchQuestions() {
    const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await res.json();
    return data;
}