"use client";

import Input from "./Input";
import { useRef, useState } from "react";
import Link from "next/link";
import { REQUEST_URL } from "@/utils/Constant";
import { useRouter } from "next/navigation";
import { userSignup } from "@/utils/apiCalls";

export default function LibrarianRegistration() {
  const formTags = [
    "Full Name",
    "Email",
    "Password",
    "Confirm Password",
    "College",
    "Library ID",
    "Library Key",
    "Branch",
  ];

  const router = useRouter();
  const [matchPassword, setMatchPassword] = useState(false);
  const [shortLength, setShortLength] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const collegeRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const libraryIDRef = useRef();
  const libraryKeyRef = useRef();
  const branchRef = useRef();

  const refs = {
    fullname: nameRef,
    email: emailRef,
    college: collegeRef,
    password: passwordRef,
    confirmpassword: confirmPasswordRef,
    libraryid: libraryIDRef,
    librarykey: libraryKeyRef,
    branch: branchRef,
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      college: collegeRef.current.value,
      role: "Admin",
      enrollmentNumber: libraryIDRef.current.value,
      adminKey: libraryKeyRef.current.value,
      branch: branchRef.current.value,
    };

    if (data.password.length < 8) {
      setMatchPassword(false);
      setShortLength(true);
      return;
    }

    if (confirmPasswordRef.current.value !== data.password) {
      setMatchPassword(true);
      setShortLength(false);
      return;
    }

    const response = await userSignup(data);

    if (response.ok) {
      setTimeout(() => {
        router.push("/Login");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="hidden md:flex w-1/2 items-center justify-center p-10">
        <img
          src="/6310507.jpg"
          alt="Illustration"
          className="w-full max-w-lg rounded-xl shadow-2xl"
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
            Librarian Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign up to manage your institution's digital library.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form
            className="bg-white p-8 rounded-lg shadow-lg space-y-6"
            onSubmit={onSubmitHandler}
          >
            {formTags.map((el) => (
              <Input
                htmlFor={el}
                labelClasses="block text-sm font-medium text-gray-700"
                inputClasses="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                type={
                  el === "Email"
                    ? "email"
                    : el.includes("Password")
                    ? "password"
                    : "text"
                }
                ref={refs[el.split(" ").join("").toLowerCase()]}
                key={el}
              />
            ))}

            {matchPassword && (
              <p className="text-sm text-red-600 font-medium">
                Passwords don't match
              </p>
            )}
            {shortLength && (
              <p className="text-sm text-red-600 font-medium">
                Password must be at least 8 characters
              </p>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white py-2 px-4 rounded-md shadow-md font-semibold transition transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link
              href="/StudentRegistration"
              className="font-semibold text-teal-600 hover:text-teal-500 transition"
            >
              Are you a student?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
