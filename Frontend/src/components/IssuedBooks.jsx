"use client";
import { AuthContext } from "@/context/AuthContext";
import { REQUEST_URL } from "@/utils/Constant";
import { useContext, useEffect, useState } from "react";
import IssueBook from "./IssueBook";

const IssuedBooks = () => {
  const [issuedBookDetails, setIssuedBookDetails] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const [isReviewAdded,setIsReviewAdded]=useState(false);
  const fetchData = async () => {
    const res = await fetch(`${REQUEST_URL}/user/requests`, {
      methood: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    setIssuedBookDetails(data.data);
  };

  const addReview = async (data) => {

    const res = await fetch(`${REQUEST_URL}/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchData();
  }, [accessToken]);

  return (
    <div>
      {issuedBookDetails.map((issuedBook) => (
        <IssueBook key={issuedBook._id}
          name={issuedBook.bookName}
          fine={issuedBook.fine}
          issueDate={issuedBook.issueTime}
          returnDate={issuedBook.returnTime}
          status={issuedBook.status}
          bookId={issuedBook.book}
          addReview={addReview}
        />
      ))}
    </div>
  );
};

export default IssuedBooks;
