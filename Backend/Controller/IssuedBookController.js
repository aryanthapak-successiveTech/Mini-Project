import User from "../Models/UserModel.js";
import Book from "../Models/BookModel.js";
import Request from "../Models/IssueModel.js";
import catchAsync from "../utils/catchAsync.js";
import { ApiError } from "../Middlwares/AppError.js";

export const checkIssuedBooks = catchAsync(async (req, res, next) => {
  const enrollmentNo = req.body.enrollmentNo?.toUpperCase();

  const student = await User.findOne({
    enrollmentNumber: enrollmentNo,
  }).populate("bookRequests");

  if (!student) {
    throw new ApiError(404, "User not found");
  }

  const issuedBooks = student.bookRequests;

  res.status(200).json({
    status: "Success",
    data: issuedBooks.filter((request) => request.status === "Collected" || request.status === "Returned"),
  });
  next();
});

export const returnBook = catchAsync(async (req, res, next) => {
  try {
    const id = req.query.id;

    const request = await Request.findOne({ _id: id });

    request.status = "Returned";
    request.returnTime = new Date();

    const timeDiff = request.returnTime - request.issueTime;
    const daysDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    const lateDays = Math.max(daysDiff - 14, 0);
    request.fine = lateDays * 5;

    await request.save();

    const updatedBook = await Book.findOneAndUpdate(
      { _id: request.book },
      { $inc: { qty: +1 } },
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      data: request,
    });
  } catch (err) {
    next(err);
  }
});

export const statistics = catchAsync(async (req, res, next) => {
  const { year } = req.query;

  if (!year || isNaN(year)) {
    return res.status(400).json({ error: "Invalid year parameter" });
  }

  const yearInt = parseInt(year);

  const booksPerMonth = await Request.aggregate([
    {
      $match: {
        issueTime: {
          $gte: new Date(yearInt, 0),
          $lt: new Date(yearInt + 1, 0),
        },
        status:{$in:["Collected","Returned","Approved"]}
      },
    },
    {
      $project: {
        month: { $month: "$issueTime" },
        year: { $year: "$issueTime" },
      },
    },
    {
      $group: {
        _id: { month: "$month", year: "$year" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        count: 1,
      },
    },
  ]);

  const totalFine = await Request.aggregate([
    {
      $match: {
        fine: { $exists: true },
        issueTime: {
          $gte: new Date(yearInt, 0),
          $lt: new Date(yearInt + 1, 0),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalFine: { $sum: "$fine" },
      },
    },
  ]);

  const totalBooksIssued = await Request.countDocuments({
    status:{$in:["Collected","Returned","Approved"]},
    issueTime: {
      $gte: new Date(yearInt, 0),
      $lt: new Date(yearInt + 1, 0),
    },
  });

  res.status(200).json({
    booksIssuedPerMonth: booksPerMonth,
    totalFine: totalFine.length > 0 ? totalFine[0].totalFine : 0,
    totalBooksIssued: totalBooksIssued,
  });
});

export const reIssueBook = catchAsync(async (req, res, next) => {
  const id = req.query.id;

  const updatedBook = await Request.findOneAndUpdate(
    { _id: id },
    { issueTime: Date.now() },
    { new: true }
  );

  res.status(200).json(updatedBook);

  next();
});
