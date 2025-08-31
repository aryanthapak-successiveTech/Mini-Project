import jwt from "jsonwebtoken";
import { ApiError } from "../Middlwares/AppError.js";

export const authChecker = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access token missing or malformed");
    }

    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      enrollmentNo:decoded.enrollmentNo
    };


    next();
  } catch (err) {
    next(err);
  }
};

export const roleBasedAccess = (allowedRoles) => {
  const rolesSet = new Set(allowedRoles);
  return function (req, res, next) {
    try {
      if (!rolesSet.has(req.user.role)) {
        throw new ApiError(403, "Forbidden Access");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export const verifyAdminRegistration = (req, res, next) => {
  try {
    const { role } = req.body;
    if (role != "Admin") {
      next();
    }

    const {adminKey}=req.body;

    const isValidAdminKey = process.env.ADMIN_KEY === adminKey;

    if (!isValidAdminKey) {
      throw new ApiError(403,"Invalid admin key")
    }
    next();
  } catch (err) {
    next(err);
  }
};
