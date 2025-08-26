"use client";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/signup");
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">
            Welcome to QuickLib
          </h1>
          <p className="text-lg mb-6 text-gray-800">
            Welcome to QuickLib, your central hub for accessing educational
            resources at our college. Whether you're a student, faculty member,
            or researcher, QuickLib provides you with easy access to a vast
            collection of books, journals, and academic materials.
          </p>
          <p className="text-lg text-gray-800">
            Explore our catalog, conduct research, and enhance your learning
            experience with QuickLib's user-friendly platform.
          </p>
        </div>
        <div className="w-8/12">
          <img
            src="/homepage1.png"
            alt="Library Image"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-8/12">
          <img
            src="/homepage2.png"
            alt="Reading Image"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-green-900">
            Discover New Reads
          </h1>
          <p className="text-lg mb-6 text-gray-800">
            Explore our diverse collection of books curated to meet the academic
            needs of our college community. From textbooks to research
            publications, QuickLib offers resources tailored to support your
            studies and intellectual pursuits.
          </p>
          <p className="text-lg text-gray-800">
            Delve into captivating narratives, expand your knowledge, and
            broaden your horizons through the power of literature available at
            QuickLib.
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClickHandler}
        >
          Get Started
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
