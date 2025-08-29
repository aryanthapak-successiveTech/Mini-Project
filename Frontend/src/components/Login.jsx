"use client";

import Link from "next/link";
import Input from "./Input";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/Auth";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [wrongPassword, setWrongPassword] = useState(false);
  const router = useRouter();
  const emailRef = useRef();
  const PasswordRef = useRef();
  const { setAccessToken, setRole } = useContext(AuthContext);

  const onSubmitHandler = async (event) => {
    setWrongPassword(false);
    event.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: PasswordRef.current.value,
    };
    try {
      const userData = await login(data.email, data.password);
      setAccessToken(userData.accessToken);
      setRole(userData.role);
      router.push("/Profile");
    } catch (error) {
      console.error("Login failed", error);
      setWrongPassword(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="hidden md:flex w-1/2 items-center justify-center p-10">
        <img
          src="/Mobile login-amico.png"
          alt="Illustration"
          className="w-full max-w-md rounded-xl shadow-2xl"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-16 lg:px-24 animate-fade-in">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <img
            className="mx-auto h-12 w-auto"
            src="/QuickLib logo1.png"
            alt="QuickLib"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-blue-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue your journey with QuickLib.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form
            className="bg-white p-8 rounded-lg shadow-lg space-y-6"
            onSubmit={onSubmitHandler}
          >
            <Input
              htmlFor="Email"
              labelClasses="block text-sm font-medium text-gray-700"
              inputClasses="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              type="email"
              ref={emailRef}
            />

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/Forgot"
                    className="font-semibold text-teal-600 hover:text-teal-500 transition"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  ref={PasswordRef}
                />
              </div>
            </div>

            {wrongPassword && (
              <p className="text-sm text-red-600 font-medium">
                Incorrect email or password.
              </p>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white py-2 px-4 rounded-md shadow-md font-semibold transition transform hover:scale-105"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/Signup"
              className="font-semibold text-teal-600 hover:text-teal-500 transition"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
