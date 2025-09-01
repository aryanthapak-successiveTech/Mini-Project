import Review from "../Models/ReviewBookModel.js";
import catchAsync from "../utils/catchAsync.js";
import { ApiError } from "../Middlwares/AppError.js";
import Request from "../Models/IssueModel.js";

export const createReview = catchAsync(async (req, res, next) => {
  const {postedFor, review, rating } = req.body;
  const newReview = await Review.create({
    postedBy:req.user.userId,
    postedFor,
    review,
    rating,
  });

  await Request.findOneAndUpdate({
    user:req.user.userId
  },{review:newReview._id},{
    runValidators:true
  })
  res.status(201).json({
    status: "Success",
    data: newReview,
  });
});

export const getReviewsForBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    Review.find({ postedFor: bookId }).sort({rating:-1})
      .skip(skip)
      .limit(limit)
      .populate("postedBy", "name email"),

    Review.countDocuments({ postedFor: bookId })
  ]);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    data: reviews
  });
});

export const getReviewsByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const reviews = await Review
    .find({ postedBy: userId })
    .populate("postedFor", "name author");
  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: reviews,
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const deleted = await Review.findByIdAndDelete(reviewId);
  if (!deleted) throw new ApiError(404, "Review not found");
  res.status(200).json({
    status: "Success",
    message: "Review deleted",
  });
});
