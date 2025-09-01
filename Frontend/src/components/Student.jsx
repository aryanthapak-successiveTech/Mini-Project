"use client";
import { useContext, useRef, useState } from "react";
import BookReturn from "./BookReturn";
import { AuthContext } from "@/context/AuthContext";
import { getStudentBookHistory } from "@/utils/apiCalls";


const Student = () => {
  const searchRef = useRef();
  const [studentData, setStudentData] = useState([]);
  const [wrong, setWrong] = useState(false);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useContext(AuthContext);

  const searchHandler = async (event) => {
    event.preventDefault();
    setWrong(false);
    setStudentData([]);

    const enrollmentNo = searchRef.current.value.trim();
    if (!enrollmentNo) return;

    setLoading(true);
    try {
      const response = await getStudentBookHistory(enrollmentNo,accessToken)

      if (!response.ok) {
        setWrong(true);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setStudentData(data.data);
    } catch (error) {
      setWrong(true);
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <form
          className="max-w-md w-full bg-white shadow-md rounded-lg px-8 pt-6 pb-4"
          onSubmit={searchHandler}
          aria-label="Student enrollment search form"
        >
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              type="text"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Enter Enrollment Number"
              ref={searchRef}
              aria-label="Enrollment Number"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={`flex-shrink-0 border-4 text-sm py-1 px-2 rounded text-white ${
                loading
                  ? "bg-teal-300 border-teal-300 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700"
              }`}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
      {wrong && (
        <p className="text-red-600 text-center font-semibold">
          Something went wrong. Please try again.
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {studentData.map((el) => (
          <BookReturn
            key={el._id}
            name={el.Name}
            book={el.book}
            status={el.status}
            id={el._id}
            issueTime={el.issueTime}
            returnTime={el.returnTime}
            fine={el.Fine}
          />
        ))}
      </div>
    </div>
  );
};

export default Student;
