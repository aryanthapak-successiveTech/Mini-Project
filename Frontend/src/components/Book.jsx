import {  usePathname, useRouter } from "next/navigation";


const Book = (props) => {
  const router = useRouter();
  const location=usePathname();
  const onSelectHandler = () => {
    const id = props.id;
    router.push(`${location}/${id}`);
  };
  return (
    <div className="max-w-md my-4 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <img src="/download.png" alt="Book Cover" className="w-40 h-auto" />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Title: {props.name}</h1>
        <h2 className="text-lg text-gray-700 mb-4">Author: {props.author}</h2>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-sm text-white py-2 px-4 rounded"
          onClick={onSelectHandler}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default Book;