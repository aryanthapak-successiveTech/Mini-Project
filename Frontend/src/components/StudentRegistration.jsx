import image from "../Items/QuickLib logo1.png";
import sideImage from "../Items/6310507.jpg";
import Input from "../utils/Input";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/Constant";

export default function StudentRegistration() {
  const formTags = [
    "Full Name",
    "Email",
    "Password",
    "Confirm Password",
    "College",
    "Enrollment",
    "Session",
    "Branch",
  ];

  const navigate = useNavigate();
  const [matchPassword, setMatchPassword] = useState(false);
  const [shortLength, setShortLength] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const collegeRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const enrollmentRef = useRef();
  const branchRef = useRef();
  const sessionRef = useRef();

  const refs = {
    fullname: nameRef,
    email: emailRef,
    college: collegeRef,
    password: passwordRef,
    confirmpassword: confirmPasswordRef,
    enrollment: enrollmentRef,
    branch: branchRef,
    session: sessionRef,
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      college: collegeRef.current.value,
      enrollmentNumber: enrollmentRef.current.value,
      branch: branchRef.current.value,
      role: "Student",
    };

    if (data.password.length < 8) {
      setMatchPassword(false);
      setShortLength(true);
      return;
    }
    if (confirmPasswordRef.current.value !== data.password) {
      setMatchPassword(false);
      setMatchPassword(true);
      return;
    }

    const response = await fetch(`${BASE_URL}/api/v1/user/Signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-[50%] hidden md:block">
          <img src={sideImage} alt="illustration" />
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={image}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmitHandler}>
              {formTags.map((el) => (
                <Input
                  htmlFor={el}
                  labelClasses="block text-sm font-medium leading-6 text-gray-900"
                  inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <p className="text-[red]">Passwords Dont Match</p>
              )}
              {shortLength && (
                <p className="text-[red]">Passwords length is short</p>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
