"use client";

import { useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const supabase = supabaseClient();

  const Login = async () => {
    const response = await supabase.auth.signInWithPassword({
      email: "ochkobn5@gmail.com",
      password: "Hunbn1234",
    });
    console.log(response);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
                <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to your quizzes
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
                  </svg>

                  <input
                    placeholder="you@example.com"
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <button className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500">
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>

                  <input
                    placeholder="••••••••"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              {/* Login button */}
              <button
                onClick={Login}
                className="h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
              >
                Login
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">
                SECURE LOGIN
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="text-center text-xs leading-5 text-gray-400">
              By continuing, you agree to use this application responsibly.
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Quizly • Your quizzes, all in one place
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
