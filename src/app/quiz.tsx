'use client'

import { useState } from "react";
import { StartPageProps, QuizProps, QuizContainerProps, QuizButtonProps, PageProps } from "./interface";
import { TbDoorExit } from "react-icons/tb";

function StartPage({ isStart, onHandleClick }: StartPageProps) {
  return (
    <>
    <div className={`${isStart ? 'hidden' : ''} flex flex-col items-center justify-center rounded-lg bg-gray-800 h-96 w-full`}>
      <button className="rounded-lg bg-gray-500 py-1 px-3" onClick={onHandleClick}>Start</button>
    </div>
    </>
  );
}

function QuizButton({ answerToQuestion, question, onHandleClick,selectedAnswer }: QuizButtonProps) {
    const isSelected = selectedAnswer === question;
    const isCorrect = question === answerToQuestion;
    const css = isSelected ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : '';

    function answer() {
        onHandleClick(question);
    }

    return(
        <>
        <button className={`border-2 border-dotted rounded-lg w-full text-left px-2 ${css}`} onClick={ answer }>
            { question }
        </button>
        </>
    );
}

function QuizContainer({ score, maxScore, questions, questionIndex, onHandleClick }: QuizContainerProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const question = questions[questionIndex] ?  questions[questionIndex][0] : '';
    const answerToQuestion = questions[questionIndex] ?  questions[questionIndex][1] : '';
    const optionA = questions[questionIndex] ? questions[questionIndex][2] : '';
    const optionB = questions[questionIndex] ? questions[questionIndex][3] : '';
    const optionC = questions[questionIndex] ? questions[questionIndex][4] : '';
    const optionD = questions[questionIndex] ? questions[questionIndex][5] : '';

    function handleAnswerClick(answer: string) {
        setSelectedAnswer(answer);
        onHandleClick(answer)
    }

    return (
        <>
        <div className="bg-gray-700 rounded-lg w-full h-full p-3">
            <div className="flex bg-gray-500 rounded-lg w-full h-14 items-center justify-center text-justify">
                <span>{question}</span>
            </div>
            <div className="flex flex-col items-center justify-around bg-gray-500 rounded-lg w-full h-56 px-3 mt-3">
                <QuizButton answerToQuestion={answerToQuestion} question={optionA}
                    onHandleClick={handleAnswerClick} selectedAnswer={selectedAnswer}/>
                <QuizButton answerToQuestion={answerToQuestion} question={optionB}
                    onHandleClick={handleAnswerClick} selectedAnswer={selectedAnswer} />
                <QuizButton answerToQuestion={answerToQuestion} question={optionC}
                    onHandleClick={handleAnswerClick} selectedAnswer={selectedAnswer} />
                <QuizButton answerToQuestion={answerToQuestion} question={optionD}
                    onHandleClick={handleAnswerClick} selectedAnswer={selectedAnswer} />
            </div>
            <div>
                <div className="bg-gray-500 rounded-lg w-32 h-8 text-center py-1 mt-3">Score: { score }/{ maxScore }</div>
            </div>
        </div>
        </>
    );
}

function QuizPage({ score, maxScore, questionIndex, questionsList, isStart, onHandleClick, onExitQuiz }: QuizProps) {
  return (
    <>
    <div className={`${isStart ? '' : 'hidden'} relative flex flex-col items-center rounded-lg bg-gray-800 p-3 h-96 w-full`}>
      <button className="absolute rounded-full border-2 border-gray-300 bg-gray-500 p-1 m-3 bottom-3 right-3" onClick={onExitQuiz}>
        <TbDoorExit size={20}/>
      </button>
      <QuizContainer score={score} maxScore={maxScore} questions={questionsList} questionIndex={questionIndex} onHandleClick={onHandleClick} />
    </div>
    </>
  );
}


export default function Quiz({questions}: PageProps) {
  const[isStart, setIsStart] = useState<boolean>(false);
  const[questionsList, setQuestionsList] = useState<string[][]>([['Loading','','','','']]);
  const[questionIndex, setQuestionIndex] = useState<number>(0);
  const[score, setScore] = useState<number>(0);

  function shuffleArray(array: string[]) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function updateQuestion(question: string) {
    if(questionIndex < questionsList.length - 1) {
        const correctAnswer = question === questionsList[questionIndex][1];
        if(correctAnswer) {
            setScore(prevScore => prevScore += 1);
        }
        setTimeout(() => {
            setQuestionIndex(prevQuestionIndex => prevQuestionIndex += 1);
        }, 1000)
        return;
    }
    setTimeout(() => {
        exitQuiz();
    }, 1000)
  }

  function startQuiz() {
    let setOfQuestion = []
    setIsStart(true);
    for(let i = 0; i < questions.length; i++) {
        const question = questions[i].question;
        const correctAnswer = questions[i].correct_answer;
        const incorrectAnswer = questions[i].incorrect_answers
        const combinedList = [correctAnswer , ...incorrectAnswer];
        const shuffleList = shuffleArray(combinedList);
        const packageQuestion = [question, correctAnswer, ...shuffleList];
        setOfQuestion.push(packageQuestion)
        console.log(correctAnswer);
    }
    setQuestionsList(setOfQuestion);
  }

  function exitQuiz() {
    setIsStart(false);
    setQuestionIndex(0);
    setQuestionsList([['Loading','','','','']]);
    setScore(0)
  }

  return (
    <div className="bg-black h-screen text-white p-5">
      <StartPage isStart={isStart} onHandleClick={startQuiz}/>
      <QuizPage score={score} maxScore={questionsList.length} questionIndex={questionIndex}
        questionsList={questionsList} isStart={isStart} onHandleClick={updateQuestion}
        onExitQuiz={exitQuiz}/>
    </div>
  );
}