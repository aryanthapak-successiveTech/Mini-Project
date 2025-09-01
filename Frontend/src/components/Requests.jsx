"use client";
import React, { useState, useEffect, useContext } from "react";
import Request from "./Request";
import { AuthContext } from "@/context/AuthContext";
import { fetchRequestDetails } from "@/utils/apiCalls";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { accessToken, role } = useContext(AuthContext);

  useEffect(() => {
    if (!accessToken) return;
    fetchData();
  }, [accessToken]);

  const requestChangeHandler = (id) => {
    setRequests((prevRequests) => prevRequests.filter((el) => el._id !== id));
  };

  const fetchData = async () => {
    try {
      const requestsData=await fetchRequestDetails(accessToken)
      setRequests(requestsData.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const noPendingRequests = requests.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">
        Book Requests
      </h1>

      {noPendingRequests ? (
        <div className="flex flex-col items-center grow justify-center text-center bg-white rounded-xl shadow-md p-8">
          <img
            src="/no-requests.jpeg"
            alt="No requests"
            className="w-32 h-32 mb-4 opacity-70"
          />
          <h2 className="text-xl font-semibold text-gray-700">
            No Pending Requests
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            You're all caught up. Any new requests will show up here!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Request
              key={request._id}
              email={request.user.email}
              book={request.book.name}
              id={request._id}
              status={request.status}
              role={role}
              requestChangeHandler={requestChangeHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
