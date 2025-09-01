import { useState, useRef } from "react";
import RatingStars from "./RatingStars";

const IssueBook = ({
  name,
  status,
  issueDate,
  fine,
  bookId,
  addReview,
  review,
  rating,
}) => {
  const [isAddingReview, setIsAddingReview] = useState(false);
  const reviewRef = useRef();
  const [selectedRating, setSelectedRating] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const submitReviewHandler = () => {
    const reviewText = reviewRef.current.value.trim();
    if (!reviewText || selectedRating === 0) return;

    const data = {
      review: reviewText,
      rating: selectedRating,
      postedFor: bookId,
    };

    addReview(data);
    setIsAddingReview(false);
    setSelectedRating(0);
    reviewRef.current.value = "";
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-teal-700 mb-2">{name}</h2>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Status:</span> {status}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Issued on:</span> {formatDate(issueDate)}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-medium">Fine:</span> ₹{fine}
      </p>

      {review && rating ? (
        <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4">
          <h3 className="font-medium text-gray-800 mb-1">Your Review:</h3>
          <p className="text-gray-700 mb-1">{review}</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <RatingStars
                key={star}
                filled={star <= rating}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      ) : !isAddingReview ? (
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => setIsAddingReview(true)}
        >
          Add Review
        </button>
      ) : (
        <div className="mt-4 w-full">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            Your Review
          </label>

          <div className="flex space-x-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <RatingStars
                key={star}
                filled={star <= selectedRating}
                onClick={() => setSelectedRating(star)}
              />
            ))}
          </div>

          <textarea
            id="review"
            ref={reviewRef}
            rows="4"
            placeholder="Write your thoughts about the book..."
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          ></textarea>

          <div className="mt-2 flex gap-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded"
              onClick={submitReviewHandler}
            >
              Submit
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-4 rounded"
              onClick={() => setIsAddingReview(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueBook