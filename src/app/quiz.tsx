'use client'

import { useState } from "react";
import { StartPageProps,
         QuizProps,
         QuizContainerProps,
         QuizButtonProps,
         PageProps,
         ResultPageProps } from "./interface";
import { TbDoorExit } from "react-icons/tb";
import { RxUpdate } from "react-icons/rx";
import { FaPlay } from "react-icons/fa";

function StartPage({ isStart,  isFinish, totalQuestions, onHandleClick }: StartPageProps) {
  return (
    <>
    <div className={`${isStart || isFinish ? 'hidden' : ''} relative flex flex-col rounded-lg bg-gray-800 p-3 h-96 w-full`}>
      <h1 className="flex bg-gray-500 rounded-lg w-full h-14 items-center justify-center text-justify">Quiz APP</h1>
      <ul className="flex flex-col bg-gray-500 rounded-lg w-full h-56 p-3 mt-3 overflow-y-auto">
        <li className="mb-2">Quiz APP é uma plataforma de perguntas com múltiplas escolhas.</li>
        { totalQuestions > 1 ?
          (<li className="mb-2">Serão realizadas { totalQuestions } perguntas com quatro alternativas, havendo apenas uma opção correta.</li>) :
          (<li className="mb-2">Será realizada { totalQuestions } pergunta com quatro alternativas, havendo apenas uma opção correta.</li>)
        }
        <li className="mb-2"> O Quiz APP oferece uma experiência interativa e envolvente, onde os usuários podem testar seus conhecimentos em diversos tópicos.</li>
        <li className="mb-2">Após selecionar uma resposta, o usuário recebe feedback imediato, indicando se a resposta está correta ou incorreta.</li>
        <li className="mb-2"> A pontuação é atualizada em tempo real, permitindo que os usuários acompanhem seu desempenho ao longo do quiz.</li>
        <li className="mb-2">O aplicativo inclui uma ampla variedade de perguntas, garantindo que cada sessão de quiz seja única e desafiadora.</li>
        <li className="mb-2">A interface é intuitiva e fácil de usar, proporcionando uma experiência agradável para todos os usuários.</li>
      </ul>
      <button className="absolute flex rounded-full border-2 border-gray-300 bg-gray-500 p-1 m-3 bottom-3 right-3 hover:p-2 hover:m-2" onClick={onHandleClick}>
        <FaPlay size={20}/>
      </button>
    </div>
    </>
  );
}

function QuizButton({ answerToQuestion, question, onHandleClick, selectedAnswer }: QuizButtonProps) {
  let css = ''
  if(selectedAnswer) {
    const isSelected = selectedAnswer[0] === question || selectedAnswer[1] === question;
    const isCorrect = question === answerToQuestion;
    css = isSelected ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : '';
  }

    function answer() {
      onHandleClick(question);
    }

    return(
        <>
        <button dangerouslySetInnerHTML={{__html: question}} onClick={ answer } 
           className={`border-2 border-dotted rounded-lg w-full text-left px-2 ${css}`} />
        </>
    );
}

function QuizContainer({ score, maxScore, questions, questionIndex, onHandleClick }: QuizContainerProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<string[] | null>(null);
    const question = questions[questionIndex] ?  questions[questionIndex][0] : '';
    const answerToQuestion = questions[questionIndex] ?  questions[questionIndex][1] : '';
    const optionA = questions[questionIndex] ? questions[questionIndex][2] : '';
    const optionB = questions[questionIndex] ? questions[questionIndex][3] : '';
    const optionC = questions[questionIndex] ? questions[questionIndex][4] : '';
    const optionD = questions[questionIndex] ? questions[questionIndex][5] : '';

    function handleAnswerClick(answer: string) {
        setSelectedAnswer([answer, answerToQuestion]);
        onHandleClick(answer)
    }

    return (
        <>
        <div className="bg-gray-700 rounded-lg w-full h-full p-3">
            <div className="flex bg-gray-500 rounded-lg w-full h-14 items-center justify-center text-justify p-3 overflow-auto">
                <span dangerouslySetInnerHTML={{__html: question}} />
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
            <div className="flex flex-row">
                <div className="bg-gray-500 rounded-lg w-32 h-8 text-center py-1 mt-3 small-screen-text">Score: { score }/{ maxScore }</div>
                <div className="bg-gray-500 rounded-lg w-20 h-8 text-center py-1 mt-3 small-screen-numbers">S: { score }/{ maxScore }</div>
                <div className="bg-gray-500 rounded-lg w-56 h-8 text-center py-1 mt-3 mx-3 small-screen-text">Remaining questions: { questionIndex }/{ maxScore }</div>
                <div className="bg-gray-500 rounded-lg w-24 h-8 text-center py-1 mt-3 mx-3 small-screen-numbers">RQ: { questionIndex }/{ maxScore }</div>
            </div>
        </div>
        </>
    );
}

function QuizPage({ score, maxScore, questionIndex, questionsList, isStart, isFinish, onHandleClick, onExitQuiz }: QuizProps) {
  return (
    <>
    <div className={`${isStart && !isFinish ? '' : 'hidden'} relative flex flex-col items-center rounded-lg bg-gray-800 p-3 h-96 w-full`}>
      <button className="absolute rounded-full border-2 border-gray-300 bg-gray-500 p-1 m-3 bottom-3 right-3 hover:p-2 hover:m-2" onClick={onExitQuiz}>
        <TbDoorExit size={20}/>
      </button>
      <QuizContainer score={score} maxScore={maxScore} questions={questionsList} questionIndex={questionIndex} onHandleClick={onHandleClick} />
    </div>
    </>
  );
}

function ResultPage({isFinish, score, maxScore, onExitQuiz}: ResultPageProps){
  const css = isFinish ? '' : 'hidden'
  return(
    <>
    <div className={`${css} relative flex flex-col items-center justify-center rounded-lg bg-gray-800 p-3 h-96 w-full`}>
      <h3 className={'text-6xl mb-6'}>Final Score</h3>
      <p className={'text-4xl'}>Scored { score }/{maxScore} on the test</p>
      <button className="absolute rounded-full border-2 border-gray-300 bg-gray-500 p-1 m-3 bottom-3 right-3 hover:p-2 hover:m-2" onClick={onExitQuiz}>
        <RxUpdate  size={20}/>
      </button>
    </div>
    </>
  );
}


export default function Quiz({questions}: PageProps) {
  const emptyQuestions = ['Loading','','','','','']
  const[isStart, setIsStart] = useState<boolean>(false);
  const[isFinish, setIsFinish] = useState<boolean>(false);
  const[questionsList, setQuestionsList] = useState<string[][]>([emptyQuestions]);
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
    const correctAnswer = question === questionsList[questionIndex][1];
    if(questionIndex < questionsList.length - 1) {
        if(correctAnswer) {
            setScore(prevScore => prevScore += 1);
        }
        setTimeout(() => {
            setQuestionIndex(prevQuestionIndex => prevQuestionIndex += 1);
        }, 1000)
        return;
    }
    if(correctAnswer) {
        setScore(prevScore => prevScore += 1);
    }
    setTimeout(() => {
      setIsFinish(true);
    }, 1000)
  }

  function startQuiz() {
    const setOfQuestion = []
    setIsStart(true);
    if(questions.length > 0) {
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
      return;
    }
    setQuestionsList([emptyQuestions]);
  }

  function exitQuiz() {
    setIsStart(false);
    setIsFinish(false);
    setQuestionIndex(0);
    setQuestionsList([emptyQuestions]);
    setScore(0)
  }

  return (
    <div className="bg-black h-screen text-white p-5">
      <StartPage isStart={isStart} isFinish={isFinish} totalQuestions={questionsList.length} onHandleClick={startQuiz}/>
      <QuizPage score={score} maxScore={questionsList.length} questionIndex={questionIndex}
        questionsList={questionsList} isStart={isStart} isFinish={isFinish}
        onHandleClick={updateQuestion} onExitQuiz={exitQuiz}/>
      <ResultPage isFinish={isFinish} score={score} maxScore={questionsList.length} onExitQuiz={exitQuiz}/>
    </div>
  );
}