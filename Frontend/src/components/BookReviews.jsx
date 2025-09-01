import { AuthContext } from "@/context/AuthContext";
import { REQUEST_URL } from "@/utils/Constant";
import { useContext, useEffect, useState } from "react";
import BookReview from "./BookReview";
import PaginationComponent from "./Pagination";
import { getBookReviews } from "@/utils/apiCalls";

const BookReviews=({bookId})=>{
    const [reviews,setReviews]=useState([]);
    const {accessToken}=useContext(AuthContext);
    const [totalPages,setTotalPages]=useState(1);
    const [currentPage,setCurrentPage]=useState(1);
    const fetchData=async()=>{
        const res=await getBookReviews(accessToken,bookId,currentPage);

        const reviewData=await res.json();

        setReviews(reviewData.data);
        setTotalPages(reviewData.totalPages);

    }

    useEffect(()=>{
        if(!accessToken) return;
        fetchData();
    },[accessToken,currentPage])

    return(
        <section className="flex flex-col items-center w-full">
            <BookReview data={reviews}/>
            <PaginationComponent total={totalPages} onPageChange={setCurrentPage} />
        </section>
    )
}

export default BookReviews;