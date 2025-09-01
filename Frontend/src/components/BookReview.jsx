import React from "react";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="text-yellow-400">
      {Array.from({ length: totalStars }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

const BookReview = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No reviews available.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 w-full">
      {data.map((review) => (
        <div
          key={review._id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {review.postedBy?.name || "Anonymous"}
            </h3>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-gray-600">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default BookReview;
