import { AuthContext } from "@/context/AuthContext";
import { REQUEST_URL } from "@/utils/Constant";
import { useContext, useEffect, useState } from "react";
import BookReview from "./BookReview";

const BookReviews=({bookId})=>{
    const [reviews,setReviews]=useState([]);
    const {accessToken}=useContext(AuthContext);
    const fetchData=async()=>{
        const res=await fetch(`${REQUEST_URL}/reviews/${bookId}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${accessToken}`
            }
        });

        const data=await res.json();

        setReviews(data.data);

        console.log(data);
    }

    useEffect(()=>{
        if(!accessToken) return;
        fetchData();
    },[accessToken])

    return(
        <section>
            <BookReview data={reviews}/>
        </section>
    )
}

export default BookReviews;