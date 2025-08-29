"use client";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { REQUEST_URL } from "@/utils/Constant";
import { AuthContext } from "@/context/AuthContext";

const BookData = () => {
  const [bookDetails, setDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isPresent, setIsPresent] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const router = useRouter();
  const { accessToken } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${REQUEST_URL}/books/${id}`, {
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
    } catch (error) {
      console.error("Error fetching book data:", error);
      setError("Failed to load book details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onIssueHandler = async () => {
    setIsPresent(false);
    setIsSubmitting(true);
    try {
      const response = await fetch(`${REQUEST_URL}/issueBook/requestBook`, {
        method: "POST",
        body: JSON.stringify({ bookId: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        setIsPresent(true);
        return;
      }

      router.push("/Requests");
    } catch (err) {
      console.error("Issue request failed:", err);
      setIsPresent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const backToSearchHandler = () => {
    router.back();
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchData();
  }, [id, accessToken]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold">Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold py-8">{error}</div>
    );
  }

  if (!bookDetails) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-4 gap-8">
      <div className="w-full md:w-1/3">
        <img
          src="/download.png"
          alt={`Cover of ${bookDetails.name || "book"}`}
          className="w-full h-auto rounded shadow"
        />
      </div>
      <div className="flex flex-col items-start w-full md:w-2/3 space-y-4">
        <h1 className="text-2xl font-bold">{bookDetails.name || "Untitled"}</h1>
        <h2 className="text-lg text-gray-700">
          By {bookDetails.author || "Unknown"}
        </h2>
        <p className="text-gray-700">
          {bookDetails.description || "No description available."}
        </p>
        <p className="text-gray-700 font-semibold">
          Qty: {bookDetails.qty ?? "N/A"}
        </p>

        <div className="flex space-x-4">
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onIssueHandler}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Requesting..." : "Issue Book"}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={backToSearchHandler}
          >
            Back to Search
          </button>
        </div>

        {isPresent && (
          <p className="text-red-600 font-semibold">
            You have already requested this book.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookData;
