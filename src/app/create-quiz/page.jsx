"use client";

import { useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";

const CreateQuiz = () => {
  const supabase = supabaseClient();
  const [quiz, setQuiz] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      point: 1000,
      answers: ["", "", "", ""],
      correctIndex: 0,
    },
  ]);

  const addQuestions = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        point: 0,
        answers: ["", "", "", ""],
        correctIndex: 0,
      },
    ]);
  };

  const uptadeQuestion = (value, field, questionIndex) => {
    const updatedQuestion = questions.map((question, index) => {
      if (index === questionIndex) {
        return { ...question, [field]: value };
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestion);
  };

  const updateAnswers = (questionIndex, answerIndex, value) => {
    const updatedAnswer = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        return {
          ...question,
          answers: question.answers.map((answer, aIndex) => {
            if (aIndex === answerIndex) {
              return value;
            } else {
              return answer;
            }
          }),
        };
      } else {
        return question;
      }
    });
    setQuestions(updatedAnswer);
  };

  const createQuiz = async () => {
    const response = await supabase
      .from("quiz")
      .insert({ quizName: quiz })
      .select("*")
      .single();

    const quizId = response.data.id;

    for (let i = 0; i < questions.length; i++) {
      const response = await supabase
        .from("quiz_questions")
        .insert({
          quizId: quizId,
          question: questions[i].question,
          point: questions[i].point,
        })
        .select("*");

      const questionId = response.data[0].id;

      for (let j = 0; j < questions[i].answers.length; j++) {
        await supabase
          .from("question_answers")
          .insert({
            questionId: questionId,
            answer: questions[i].answers[j],
            isCorrect: questions[i].correctIndex === j,
          })
          .select("*");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Quiz Builder
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Create your quiz
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Build questions, add answer choices, and select the correct answer.
          </p>
        </div>

        {/* Quiz information */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Quiz information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Give your quiz a name to get started.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              placeholder="e.g. JavaScript Fundamentals"
              onChange={(e) => setQuiz(e.target.value)}
              value={quiz}
              className="h-12 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />

            <button
              onClick={createQuiz}
              className="h-12 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
            >
              Create quiz
            </button>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, questionIndex) => {
            return (
              <div
                key={questionIndex}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Question header */}
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
                        Add your question and answer choices
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-400 sm:block">
                    4 answers
                  </span>
                </div>

                {/* Question content */}
                <div className="space-y-7 p-6">
                  {/* Question + points */}
                  <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Question
                      </label>

                      <input
                        placeholder="Write your question..."
                        onChange={(event) =>
                          uptadeQuestion(
                            event.target.value,
                            "question",
                            questionIndex,
                          )
                        }
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Points
                      </label>

                      <input
                        placeholder="Points"
                        type="number"
                        min={0}
                        onChange={(event) =>
                          uptadeQuestion(
                            Number(event.target.value),
                            "point",
                            questionIndex,
                          )
                        }
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>
                  </div>

                  {/* Answers */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Answer choices
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        Select the option that is correct.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {question.answers.map((answer, answerIndex) => {
                        const isCorrect = question.correctIndex === answerIndex;

                        return (
                          <div
                            key={answerIndex}
                            className={`group flex items-center gap-3 rounded-xl border p-3 transition-all ${
                              isCorrect
                                ? "border-indigo-200 bg-indigo-50/60"
                                : "border-gray-200 bg-gray-50 hover:border-gray-300"
                            }`}
                          >
                            {/* Checkbox */}
                            <input
                              type="checkbox"
                              checked={isCorrect}
                              onChange={(e) =>
                                uptadeQuestion(
                                  answerIndex,
                                  "correctIndex",
                                  questionIndex,
                                )
                              }
                              className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white transition-all checked:border-indigo-600 checked:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />

                            {/* Letter */}
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                                isCorrect
                                  ? "bg-indigo-600 text-white"
                                  : "bg-white text-gray-400 ring-1 ring-gray-200"
                              }`}
                            >
                              {String.fromCharCode(65 + answerIndex)}
                            </div>

                            {/* Answer */}
                            <input
                              placeholder={`Answer ${answerIndex + 1}`}
                              value={answer}
                              onChange={(event) =>
                                updateAnswers(
                                  questionIndex,
                                  answerIndex,
                                  event.target.value,
                                )
                              }
                              className="h-10 w-full border-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
                            />

                            {/* Correct label */}
                            {isCorrect && (
                              <span className="hidden shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 sm:block">
                                Correct
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add question */}
        <button
          onClick={addQuestions}
          className="group mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white text-sm font-semibold text-gray-500 transition-all hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-600"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-lg text-gray-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
            +
          </span>
          Add another question
        </button>

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <p className="text-xs text-gray-400">
            Build your questions • Select the correct answer • Create your quiz
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
