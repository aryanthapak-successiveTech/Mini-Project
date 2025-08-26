"use client";
import Link from "next/link";
import Input from "./Input";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/auth";
import { AuthContext } from "@/context/AuthContext";
export default function Login() {
  const [wrongPassword, setWrongPassword] = useState(false);
  const router = useRouter();
  const emailRef = useRef();
  const PasswordRef = useRef();
  const {setAccessToken,setRole}=useContext(AuthContext);
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
    <>
      <div className="flex">
        <div className="w-[50%] hidden md:block">
          <img src="/Mobile login-amico.png" alt="illustration" />
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/QuickLib logo1.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmitHandler}>
              <Input
                htmlFor="Email"
                labelClasses="block text-sm font-medium leading-6 text-gray-900"
                inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="email"
                ref={emailRef}
              />

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="/Forgot"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
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
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ref={PasswordRef}
                  />
                </div>
              </div>
              {wrongPassword && (
                <p className="text-red-600">Wrong email or password</p>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                href="/Signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
