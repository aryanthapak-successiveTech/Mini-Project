"use client";

import { createContext, useState } from "react";

const initialBook = {
  name: "",
  qty: 0,
  isbn: 0,
  description: "",
  isEditing: false,
  author:"",
  bookId:"",
  setBookId:()=>{},
  setAuthor:()=>{},
  setIsEditing: () => {},
  setName: () => {},
  setQty: () => {},
  setISBN: () => {},
  setDescription: () => {},
};
export const BookContext = createContext(initialBook);

export const BookContextProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [description, setDescription] = useState("");
  const [isbn, setISBN] = useState(0);
  const [author,setAuthor]=useState("");
  const [bookId,setBookId]=useState("");
  return (
    <BookContext.Provider
      value={{
        isEditing,
        name,
        qty,
        author,
        description,
        isbn,
        bookId,
        setAuthor,
        setIsEditing,
        setDescription,
        setISBN,
        setName,
        setQty,
        setBookId
      }}

    >
      {children}
    </BookContext.Provider>
  );
};
