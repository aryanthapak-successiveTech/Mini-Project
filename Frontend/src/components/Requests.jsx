"use client"
import React, { useState, useEffect, useContext } from "react";
import Request from "./Request";
import { REQUEST_URL } from "@/utils/constant";
import { AuthContext } from "@/context/AuthContext";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const {accessToken,role}=useContext(AuthContext);

  useEffect(() => {
    if(!accessToken) return;
    fetchData();
  }, [accessToken]);

  const requestChangeHandler = (id) => {
    setRequests((prevRequests) => prevRequests.filter((el) => el._id !== id));
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${REQUEST_URL}/issueBook/checkRequests`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRequests(data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const noPendingRequests = requests.length === 0;
  return (
    <div className="flex flex-col items-center">
      {noPendingRequests && (
        <h1 className="text-xl font-bold">No Pending Requests</h1>
      )}
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
  );
};

export default Requests;