"use client";
import { AuthContext } from "@/context/AuthContext";
import { REQUEST_URL } from "@/utils/Constant";
import { useContext, useEffect, useState } from "react";
import IssueBook from "./IssueBook";
import { addBookReview, getUserRequests } from "@/utils/apiCalls";

const IssuedBooks = () => {
  const [issuedBookDetails, setIssuedBookDetails] = useState([]);
  const { accessToken } = useContext(AuthContext);
 
  const fetchData = async () => {
    const res = await getUserRequests(accessToken);

    const data = await res.json();
    setIssuedBookDetails(data.data);

  };

  const addReview = async (data) => {

    const res = await addBookReview(accessToken,data);

    if(res.ok){
      fetchData();
    }
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
          review={issuedBook.review?.review}
          rating={issuedBook.review?.rating}
        />
      ))}
    </div>
  );
};

export default IssuedBooks;
