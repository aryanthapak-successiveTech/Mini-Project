"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Book from "./Book";
import { REQUEST_URL } from "@/utils/constant";
import { AuthContext } from "@/context/AuthContext";

const SearchPage = () => {
  const searchRef = useRef();
  const [allBooks, setAllBooks] = useState();
  const [books, setBooks] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const timeRef=useRef(null);

  const fetchData = async (searchTerm="") => {
    const response = await fetch(`${REQUEST_URL}/books?search=${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    setBooks(data.data);
  };
  const searchHandler = (event) => {
    event.preventDefault();
    const searchTerm = searchRef.current.value;    
    if(timeRef.current) clearTimeout(timeRef.current);
    timeRef.current=setTimeout(() => {
        fetchData(searchTerm);
    },1500)
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchData();
  }, [accessToken]);

  return (
    <>
      <div className="flex justify-center">
        <form className="max-w-md w-full bg-white shadow-md rounded-lg px-8 pt-6 pb-4">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              type="text"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Search..."
              ref={searchRef}
              onChange={searchHandler}
            />
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {books.map((el) => (
          <Book key={el._id} id={el._id} name={el.name} author={el.author} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
