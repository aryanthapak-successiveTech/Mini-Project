const User = require("../Models/UserModel");
const Book = require("../Models/BookModel");
const Request = require("../Models/IssueModel");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const template = require("./../utils/emailTemplate");
const { ApiError } = require("../Middlwares/AppError");

exports.checkRequests = catchAsync(async (req, res, next) => {
  const role = req.user.role;
  const email = req.user.email;
  let requests = {};
  if (role === "Student") {
    const populatedUser = await User.findOne({ email }).populate({
      path: "bookRequests",
      populate: [
        { path: "book", model: "Book" },
        { path: "user", model: "User" },
      ],
    });
    requests = populatedUser.bookRequests;
  } else if (role === "Admin") {
    requests = await Request.find({
      $or: [{ status: "Pending" }, { status: "Approved" }],
    }).populate([
      { path: "book", model: "Book" },
      { path: "user", model: "User" },
    ]);

  } else {
    res.status(403).json({
      error: "Wrong User role",
    });
  }

  res.status(200).json({ requests, role });
  next();
});

exports.requestBook = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookId } = req.body;
    const email = req.user.email;
    const userId = req.user.userId;

    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    if (book.qty === 0) {
      throw new ApiError(400, "Book is currently not available");
    }

    const existingRequest = await Request.findOne({
      user: userId,
      book: bookId,
      status: { $in: ["Pending", "Approved", "Collected"] },
    }).session(session);

    if (existingRequest) {
      throw new ApiError(400, "You already have an active request for this book");
    }

    const newRequest = await Request.create(
      [{
        email,
        book: bookId,
        status: "Pending",
        user: userId,
      }],
      { session }
    );

    await User.findOneAndUpdate(
      { email },
      {
        $push: {
          bookRequests: newRequest[0]._id,
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      status: "Success",
      data: {
        request: newRequest[0],
      },
    });

    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});
exports.approveRequest = catchAsync(async (req, res, next) => {
  const requestId = req.body.id;
  const status = req.body.status;

  const updatedRequest = await Request.findByIdAndUpdate(
    requestId,
    { status },
    { new: true, runValidators: true }
  ).populate("book user");

  if (!updatedRequest) {
    throw new ApiError(404, "Request not found");
  }

  const { book, user } = updatedRequest;

  if (status === "Rejected" || status === "Not Collected") {
    if (status === "Not Collected") {
      await Book.findByIdAndUpdate(book._id, { $inc: { qty: 1 } });
    }

    return res.status(403).json({ status: "Rejected" });
  }

  if (status === "Approved") {
    const updatedBook = await Book.findByIdAndUpdate(
      book._id,
      { $inc: { qty: -1 } },
      { new: true, runValidators: true }
    );

    if (updatedBook.qty < 0) {
      throw new ApiError(400, "Book not available anymore");
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    const emailMessage = template({
      book: book.name,
      author: book.author,
      ISBN: book.ISBN,
      dueDate: dueDate.toISOString().split("T")[0],
    });

    await sendEmail({
      email: user.email,
      message: emailMessage,
    });

    return res.status(200).json({ status: "Approved" });
  }

  if (status === "Collected") {
    await Request.findOneAndUpdate(
      { _id: requestId },
      {
        status,
      }
    );

    return res.status(200).json({ status: "Collected" });
  }

  next();
});
