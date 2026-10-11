"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";

const Page = () => {
  const [quiz, setQuiz] = useState([]);
  const supabase = supabaseClient();
  const router = useRouter();

  useEffect(() => {
    const getQuiz = async () => {
      const response = await supabase.from("quiz").select("*");
      console.log(response);
      setQuiz(response.data);
    };
    getQuiz();
  }, []);

  console.log(quiz);

  const handleRedirect = (quizId) => {
    router.push(`/quiz/${quizId}`);
  };
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Quizzes
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse all available quizzes
          </p>
        </div>

        {/* Quiz list */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quiz.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => handleRedirect(item.id)}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
                  {item.quizName}
                </h2>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75ZM3 9h18"
                    />
                  </svg>
                  <span>{item.created_at}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
