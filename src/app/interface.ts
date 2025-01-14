
export type Question = {
    category: string;
    type: "multiple" | "boolean";
    difficulty: "easy" | "medium" | "hard";
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export interface PageProps {
    questions: Question[],
}

export interface StartPageProps {
    isStart: boolean;
    onHandleClick: () => void;
}

export interface QuizProps {
    score: number;
    maxScore: number;
    isStart: boolean;
    questionIndex: number;
    questionsList: string[][],
    onExitQuiz: () => void;
    onHandleClick: (question: string) => void;
}

export interface QuizContainerProps {
    score: number;
    maxScore: number;
    questions: string[][];
    questionIndex: number;
    onHandleClick: (question: string) => void;
}

export interface QuizButtonProps {
    answerToQuestion: string,
    question: string,
    onHandleClick: (question: string) => void;
    selectedAnswer: string | null,
}