"use client";
import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { AuthContext } from "@/context/AuthContext";
import HorizontalBars from "./Barchart";
import { getStatistics } from "@/utils/apiCalls";

const Dashboard = () => {
  const [totalFine, setTotalFine] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [booksIssuedPerMonth, setBooksIssuedPerMonth] = useState([]);
  const [month, setMonth] = useState([]);

  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;
      try {
        const response = await getStatistics(accessToken)
        const data = await response.json();
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
      title: "Total Books Issued",
      value: totalBooks,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
        Dashboard Overview
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {cardData.map((el, index) => (
          <Card key={index} title={el.title} value={el.value} />
        ))}
      </div>

      {booksIssuedPerMonth.length > 0 && month.length > 0 ? (
        <HorizontalBars seriesData={booksIssuedPerMonth} xAxisLabels={month} />
      ) : (
        <p className="text-center text-gray-500">
          No data available for the selected year.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
