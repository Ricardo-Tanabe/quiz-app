export async function fetchQuestions() {
    try {
        const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple', {cache: 'no-store'});
        if(!res.ok) {
            throw new Error('Failed to fetch questions');
        }
        const data = await res.json();
        if(!data.results) {
            throw new Error('Invalid data format');
        }
        return data;
    } catch(error) {
        console.error(error);
        return { results: []};
    }
}