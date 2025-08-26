const catchAysnc = require("../utils/catchAsync");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
exports.getUsers = catchAysnc(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });

  next();
});

exports.createUser = catchAysnc(async (req, res, next) => {

  const user = await User.create(req.body);
  res.status(200).json({
    stats: "Success",
    data: {
      user,
    },
  });

  next();
});

exports.updateUser = catchAysnc(async (req, res, next) => {
  next();
});

exports.profileDetails = catchAysnc(async (req, res, next) => {
  const email = req.user.email;
  const user = await User.findOne({ email });

  const data = {
    fullname: user.name,
    role: user.role,
    branch: user.branch,
    email: user.email,
    enrollmentno: user.enrollmentNumber,
  };

  res.status(200).json(data);
  next();
});

exports.deleteUser = catchAysnc(async (req, res, next) => {
  const deletedUser = await User.findOneAndDelete(req.body);
  res.status(202).json({
    status: "Success",
    data: {
      deletedUser,
    },
  });
  next();
});
