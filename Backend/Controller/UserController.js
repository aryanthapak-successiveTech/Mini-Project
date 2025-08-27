import catchAsync from "../utils/catchAsync.js";
import User from "../Models/UserModel.js";

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });

  next();
});

export const createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    stats: "Success",
    data: {
      user,
    },
  });

  next();
});

export const updateUser = catchAsync(async (req, res, next) => {
  next();
});

export const profileDetails = catchAsync(async (req, res, next) => {
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

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findOneAndDelete(req.body);
  res.status(202).json({
    status: "Success",
    data: {
      deletedUser,
    },
  });
  next();
});
