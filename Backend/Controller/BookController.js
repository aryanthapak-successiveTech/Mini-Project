const Book = require("../Models/BookModel");
const catchAsync = require("../utils/catchAsync");

exports.getBooks = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const searchTerm = req.query.search|| "";
  const skip = (page - 1) * limit;

  const totalBooks = await Book.countDocuments();
  const books = await Book.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { author: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    results: books.length,
    total: totalBooks,
    page,
    totalPages: Math.ceil(totalBooks / limit),
    data: books,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if(!book){
    throw new ApiError(404,"Book not found");
  }

  res.status(200).json(book);
  next();
});

exports.createBooks = catchAsync(async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(200).json({
    status: "Success",
    data: {
      book,
    },
  });

  next();
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const bookId=req.params.id
  const updatedBook=await Book.findOneAndUpdate({_id:bookId},req.body,{
    new:true,
    runValidators:true,
  });

  res.status(201).json({
    status:"Success",
    data:updatedBook
  })
  next();
});

exports.deleteBook = catchAsync(async (req, res, next) => {
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
