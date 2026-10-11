"use client";

import { useParams } from "next/navigation";
import { supabaseClient } from "../../../../lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@base-ui/react";

const Page = () => {
  const params = useParams();
  const supabase = supabaseClient();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const quizId = params.quizId;

  useEffect(() => {
    const getQuizQuestions = async () => {
      const response = await supabase
        .from("quiz_questions")
        .select("* , question_answers(*)")
        .eq("quizId", quizId);
      console.log(response);
      setQuestions(response.data ?? []);
    };
    getQuizQuestions();
  }, [quizId]);

  console.log(questions);

  const handlAnswer = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };
  console.log(answers);

  const answer = () => {
    let totalPoint = 0;
    let myScore = 0;

    for (let i = 0; i < questions.length; i++) {
      totalPoint = totalPoint + questions[i].point;

      const correctAnswer = questions[i].question_answers.find((answer) => {
        return answer.isCorrect;
      });
      console.log(correctAnswer);

      if (answers[correctAnswer.questionId] === correctAnswer.id) {
        myScore = myScore + questions[i].point;
      }
    }
    setResult({ totalPoint, myScore });
  };

  const getborder = ({ isCorrect, isSelected }) => {
    console.log(isCorrect, isSelected);
    if (result && isCorrect) return "border-green-500";
    if (result && isSelected) return "border-red-500";
    if (isSelected) return "border-indigo-500";
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Quiz
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Quiz Questions
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Review the questions and answer choices below.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, questionIndex) => {
            return (
              <div
                key={question.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Question Header */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600 ring-1 ring-indigo-100">
                      {questionIndex + 1}
                    </div>

                    <div>
                      <h2 className="font-semibold text-gray-900">
                        Question {questionIndex + 1}
                      </h2>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Choose an answer
                      </p>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                    {question.point} points
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">
                    {question.question}
                  </h3>

                  {/* Answers */}
                  <div className="mt-6 space-y-3">
                    {question.question_answers.map((answer, answerIndex) => {
                      return (
                        <div
                          key={answer.id}
                          onClick={() => handlAnswer(question.id, answer.id)}
                          className={`group flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all hover:border-indigo-200 hover:bg-indigo-50/40 
                            ${getborder({
                              isCorrect: answer.isCorrect,
                              isSelected: answers[question.id] === answer.id,
                            })}`}
                        >
                          {/* Answer letter */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-gray-400 ring-1 ring-gray-200 transition-colors group-hover:bg-indigo-600 group-hover:text-white group-hover:ring-indigo-600  ">
                            {String.fromCharCode(65 + answerIndex)}
                          </div>

                          {/* Answer */}
                          <span className="text-sm font-medium text-gray-700">
                            {answer.answer}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <Button
            onClick={answer}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg sm:w-auto"
          >
            Submit Answers
          </Button>

          {result && (
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M12 3l2.25 1.5 2.75.25.75 2.75L19.5 10l-.75 2.75L19 15.5l-2.75.75L14 18l-2 2-2-2-2.25-1.75L5 15.5l.25-2.75L4.5 10l1.25-2.5L6.5 4.75l2.75-.25L12 3Z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Quiz Results
                  </h2>
                  <p className="text-sm text-gray-500">
                    Here is your score summary.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-medium text-gray-500">
                    Total Points
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {result.totalPoint}
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
                  <p className="text-sm font-medium text-indigo-600">
                    My Score
                  </p>
                  <p className="mt-2 text-3xl font-bold text-indigo-700">
                    {result.myScore}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        {questions.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
              ?
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No questions found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              This quiz doesn't have any questions yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
