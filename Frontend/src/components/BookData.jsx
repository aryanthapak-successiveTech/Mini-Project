"use client";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import {REQUEST_URL} from "@/utils/constant";
import { AuthContext } from "@/context/AuthContext";

const BookData = (props) => {
  const [bookDetails, setDetails] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isPresent, setisPresent] = useState(false);
  const { id } = useParams();

  const router = useRouter();
  const {accessToken}=useContext(AuthContext);
  const fetchData = async () => {
    try {
      const response = await fetch(`${REQUEST_URL}/books/${id}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      setDetails(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const onIssueHandler = async () => {

    const response = await fetch(
      `${REQUEST_URL}/issueBook/requestBook`,
      {
        method: "POST",
        body:JSON.stringify({bookId:id}),
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      setisPresent(true);
      return;
    }

    router.push("/Requests");
  };

  const backToSearchHandler = () => {
    router.back("/Search-book");
  };

  useEffect(() => {
    if(!accessToken) return;
    fetchData();
  }, [id,accessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex content-center items-center flex-col md:flex-row">
      <div className="w-6/12 md:w-1/3">
        <img src="/download.png" alt="A Book" className="w-full h-auto" />
      </div>
      <div className="flex flex-col items-start w-2/3 p-4">
        <h1 className="text-2xl font-bold mb-2">{bookDetails.Name}</h1>
        <h2 className="text-lg mb-2">By {bookDetails.author}</h2>
        <p className="text-gray-700 mb-4 ">{bookDetails.description}</p>
        <p className="text-gray-700 mb-4 ">Qty:x{bookDetails.qty}</p>

        <button
          className=" bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={onIssueHandler}
        >
          Issue Book
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={backToSearchHandler}
        >
          Back to Search
        </button>
        {isPresent && (
          <p className="text-red-600 ">Already Requested for this book</p>
        )}
      </div>
    </div>
  );
};

export default BookData;