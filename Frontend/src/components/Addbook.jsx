"use client";

import { useState, useRef, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { REQUEST_URL } from "@/utils/Constant";
import { AuthContext } from "@/context/AuthContext";
import { BookContext } from "@/context/BookContext";
import { addOrEditBookDetails } from "@/utils/apiCalls";
export default function AddBook() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBookNameValid, setIsBookNameValid] = useState(true);
  const [isAuthorValid, setIsAuthorValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isISBNValid, setIsISBNValid] = useState(true);
  const [isQtyValid, setIsQtyValid] = useState(true);
  const [requestUrl,setRequestUrl]=useState(`${REQUEST_URL}/books`);
  const [requestMethod,setRequestMethod]=useState("POST");
  const { accessToken } = useContext(AuthContext);
  const {bookId,author,name,qty,description,isbn,isEditing,setIsEditing}=useContext(BookContext);
  const router = useRouter();

  const nameRef = useRef();
  const authorRef = useRef();
  const isbnRef = useRef();
  const descriptionRef = useRef();
  const qtyRef = useRef();
  const fileRef = useRef();

  useEffect(()=>{
    if(!isEditing)return;
    setRequestUrl(`${REQUEST_URL}/books/${bookId}`);
    setRequestMethod("PATCH");
    nameRef.current.value=name;
    authorRef.current.value=author;
    isbnRef.current.value=isbn;
    qtyRef.current.value=qty;
    descriptionRef.current.value=description;

  },[isEditing])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const author = authorRef.current.value.trim();
    const isbn = isbnRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const qty = qtyRef.current.value.trim();

    // Validation
    const validName = name.length > 0;
    const validAuthor = author.length > 0;
    const validISBN = /^\d+$/.test(isbn);
    const validDescription = description.length > 0;
    const validQty = !isNaN(qty) && Number(qty) > 0;

    setIsBookNameValid(validName);
    setIsAuthorValid(validAuthor);
    setIsISBNValid(validISBN);
    setIsDescriptionValid(validDescription);
    setIsQtyValid(validQty);

    if (
      !validName ||
      !validAuthor ||
      !validISBN ||
      !validDescription ||
      !validQty
    ) {
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("author", author);
    formData.append("ISBN", isbn);
    formData.append("description", description);
    formData.append("qty", qty);
    if (fileRef.current.files.length > 0) {
      formData.append("ebook", fileRef.current.files[0]);
    }

    try {
      const res = await addOrEditBookDetails(requestUrl,requestMethod,formData,accessToken);

      if (!res.ok) {
        throw new Error(result.message || "Failed to add book");
      }

      const result = await res.json();

      if(isEditing){
        setIsEditing(false);
      }

      router.push("/Search-book");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-6 py-16">
      <div className="w-full max-w-2xl bg-white p-10 rounded-lg shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Add a New Book
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Book Name
            </label>
            <input
              type="text"
              ref={nameRef}
              
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
            {!isBookNameValid && (
              <p className="text-red-600 text-sm mt-1">
                Book name is required.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              ref={authorRef}
              
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
            {
              !isAuthorValid &&  <p className="text-red-600 text-sm mt-1">
                Author name is required.
              </p>
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ISBN
            </label>
            <input
              type="number"
              ref={isbnRef}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />

            {
              !isISBNValid &&  <p className="text-red-600 text-sm mt-1">
                ISBN is required.
              </p>
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              ref={descriptionRef}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            ></textarea>
            {
              !isDescriptionValid &&  <p className="text-red-600 text-sm mt-1">
                Description is required.
              </p>
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              ref={qtyRef}
              min={1}
              
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
            {
              !isQtyValid &&  <p className="text-red-600 text-sm mt-1">
                Qty is required.
              </p>
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload eBook (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              ref={fileRef}
              className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            />
          </div>

          {error && <p className="text-red-600 font-medium text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white py-3 px-6 rounded-full shadow-lg font-semibold transition transform hover:scale-105"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
