"use client"
import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { AuthContext } from "@/context/AuthContext";
import { REQUEST_URL } from "@/utils/constant";
import HorizontalBars from "./Barchart";

const Dashboard = () => {
  const [totalFine, setTotalFine] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [booksIssuedPerMonth, setBooksIssuedPerMonth] = useState([]);
  const [month, setMonth] = useState([]);

  const {accessToken}=useContext(AuthContext);
  useEffect(() => {

    const fetchData = async () => {
        if(!accessToken) return;
      try {
        const response = await fetch(
          `${REQUEST_URL}/issuedBooks/statistics?year=2025`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${accessToken}`
            }
          }
        );
        const data = await response.json();
        console.log(data);
        setTotalFine(data.totalFine);
        setTotalBooks(data.totalBooksIssued);
        setBooksIssuedPerMonth(data.booksIssuedPerMonth.map((el) => el.count));
        setMonth(data.booksIssuedPerMonth.map((el) => el.month));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const cardData = [
    {
      title: "Total Fine",
      value: `${totalFine} Rs`,
    },
    {
      title: "Total Books",
      value: totalBooks,
    },
  ];

  return (
    <div>
      <div className="flex gap-4 items-center justify-center">
        {cardData.map((el, index) => (
          <Card key={index} title={el.title} value={el.value} />
        ))}
      </div>
      {booksIssuedPerMonth.length > 0 && month.length > 0 && (
        <HorizontalBars seriesData={booksIssuedPerMonth} xAxisLabels={month} />
      )}
    </div>
  );
};

export default Dashboard;