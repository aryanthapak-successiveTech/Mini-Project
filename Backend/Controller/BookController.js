import Book from "../Models/BookModel.js";
import catchAsync from "../utils/catchAsync.js";

import { ApiError } from "../Middlwares/AppError.js";

export const getBooks = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const searchTerm = req.query.search || "";
  const skip = (page - 1) * limit;

  const findtotalBooks = Book.countDocuments({$or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { author: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ]});
  const findBooks = Book.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { author: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  })
    .skip(skip)
    .limit(limit);

  const [books,totalBooks]=await Promise.all([findBooks,findtotalBooks])

  res.status(200).json({
    status: "success",
    results: books.length,
    total: totalBooks,
    page,
    totalPages: Math.ceil(totalBooks / limit),
    data: books,
  });
});

export const getBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  res.status(200).json(book);
  next();
});

export const createBook = catchAsync(async (req, res, next) => {
  const {file}=req;
  if(file){
    req.body.eBookAddress=`/uploads/ebooks/${file.filename}`
  }
  const book = await Book.create(req.body);
  res.status(200).json({
    status: "Success",
    data: {
      book,
    },
  });

  next();
});

export const updateBook = catchAsync(async (req, res, next) => {
  const bookId = req.params.id;
  const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "Success",
    data: updatedBook,
  });
  next();
});

export const deleteBook = catchAsync(async (req, res, next) => {
  const data = req.body;
  const deletedBook = await Book.findOneAndDelete(data);
  res.status(202).json({
    status: "Success",
    data: {
      deletedBook,
    },
  });

  next();
});

