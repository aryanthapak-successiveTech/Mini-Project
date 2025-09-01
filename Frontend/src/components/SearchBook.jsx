"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Book from "./Book";
import { AuthContext } from "@/context/AuthContext";
import Pagination from "./Pagination";
import { fetchBookDetails } from "@/utils/apiCalls";

const SearchPage = () => {
  const searchRef = useRef();
  const [books, setBooks] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const [totalPages,setTotalPages]=useState(1);
  const timeRef = useRef(null);
  const [page,setPage]=useState(1);

  const fetchData = async (searchTerm = "") => {
    const bookDetails = await fetchBookDetails(page,searchTerm,accessToken)
    setBooks(bookDetails.data);
    setTotalPages(bookDetails.totalPages)
  };

  const searchHandler = (event) => {
    const searchTerm = searchRef.current.value;
    if (timeRef.current) clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      fetchData(searchTerm);
    }, 500);
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchData();
  }, [accessToken,page]);

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="flex justify-center mb-10">
        <form
          className="w-full max-w-xl bg-white/70 backdrop-blur-md shadow-md rounded-xl px-6 py-4 border border-gray-200"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              type="text"
              ref={searchRef}
              onChange={searchHandler}
              placeholder="Search books, authors..."
              className="appearance-none bg-transparent border-none w-full text-gray-800 placeholder:text-gray-400 mr-3 py-2 px-2 leading-tight focus:outline-none focus:ring-0 focus:placeholder:text-teal-600 transition-all duration-200"
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <Book
              key={book._id}
              id={book._id}
              name={book.name}
              author={book.author}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No books found.
          </div>
        )}
      </div>
      <Pagination total={totalPages} onPageChange={(value)=>setPage(value)}/>
    </div>
  );
};

export default SearchPage;
