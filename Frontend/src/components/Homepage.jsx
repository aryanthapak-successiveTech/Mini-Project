"use client";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/Signup");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">

      <section className="px-6 sm:px-16 lg:px-32 py-16 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-6 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-blue-900 leading-tight">
            Welcome to <span className="text-teal-600">QuickLib</span>
          </h1>
          <p className="text-lg text-gray-700">
            Your central hub for accessing educational resources at our college.
            Whether you're a student, faculty member, or researcher, QuickLib
            provides easy access to a vast collection of books, journals, and academic materials.
          </p>
          <p className="text-lg text-gray-700">
            Explore our catalog, conduct research, and enhance your learning
            experience with our user-friendly platform.
          </p>
        </div>
        <div className="w-full">
          <img
            src="/homepage1.png"
            alt="Library Image"
            className="w-full rounded-xl shadow-xl hover:scale-105 transition duration-300"
          />
        </div>
      </section>


      <section className="px-6 sm:px-16 lg:px-32 py-16 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center bg-white">
        <div className="w-full order-2 sm:order-1">
          <img
            src="/homepage2.png"
            alt="Reading Image"
            className="w-full rounded-xl shadow-xl hover:scale-105 transition duration-300"
          />
        </div>
        <div className="flex flex-col gap-6 order-1 sm:order-2 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-green-800 leading-tight">
            Discover New Reads
          </h2>
          <p className="text-lg text-gray-700">
            Explore a diverse collection of books curated for your academic journey.
            From textbooks to research publications, QuickLib supports your
            studies and intellectual growth.
          </p>
          <p className="text-lg text-gray-700">
            Delve into captivating narratives and expand your knowledge
            through the power of literature available at QuickLib.
          </p>
        </div>
      </section>


      <section className="flex justify-center py-12 bg-gradient-to-r from-teal-100 to-blue-100">
        <button
          onClick={onClickHandler}
          className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
        >
          Get Started
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
