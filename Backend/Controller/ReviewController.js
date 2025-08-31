import reviewModel from "../Models/ReviewBookModel.js";
import catchAsync from "../utils/catchAsync.js";
import { ApiError } from "../Middlwares/AppError.js";

export const createReview = catchAsync(async (req, res, next) => {
  const {postedFor, review, rating } = req.body;
  const newReview = await reviewModel.create({
    postedBy:req.user.userId,
    postedFor,
    review,
    rating,
  });
  res.status(201).json({
    status: "success",
    data: newReview,
  });
});

export const getReviewsForBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const reviews = await reviewModel
    .find({ postedFor: bookId })
    .populate("postedBy", "name email");
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

export const getReviewsByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const reviews = await reviewModel
    .find({ postedBy: userId })
    .populate("postedFor", "name author");
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const deleted = await reviewModel.findByIdAndDelete(reviewId);
  if (!deleted) throw new ApiError(404, "Review not found");
  res.status(200).json({
    status: "success",
    message: "Review deleted",
  });
});
