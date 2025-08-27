import User from "../Models/UserModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../Middlwares/AppError.js";

const signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
  });
};

const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
};

export const loginHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  const orignalPassword = user.password;
  const isAuthenticated = await user.correctPassword(password, orignalPassword);
  if (!isAuthenticated) {
    throw new ApiError(401, "Unauthorized");
  }

  const refreshToken = signRefreshToken({
    userId: user._id,
    email,
    role: user.role,
  });
  const accessToken = signAccessToken({
    userId: user._id,
    email,
    role: user.role,
  });

  res.cookie("jwt", refreshToken, {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  res.status(200).json({ accessToken, role: user.role });
  next();
});

export const refreshHandler = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    throw new ApiError(401, "Unauthorized");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, payload) => {
    if (err) {
      throw new ApiError(403, "Forbidden");
    }
    const accessToken = signAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });
    res.status(200).json({ accessToken, role: payload.role });
  });
});

export const logoutHandler = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ message: "Logged Out" });
  next();
});
