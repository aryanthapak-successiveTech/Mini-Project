import catchAsync from "../utils/catchAsync.js";
import User from "../Models/UserModel.js";
import Request from "../Models/IssueModel.js"
import mongoose from "mongoose";

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });

});


export const updateUser = catchAsync(async (req, res, next) => {
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

  res.status(200).json({
    status:"Success",
    data
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findOneAndDelete(req.body);
  res.status(202).json({
    status: "Success",
  });
});

export const getUserBookRequestHistory=catchAsync(async(req,res,next)=>{
  const userId=new mongoose.Types.ObjectId(req.user.userId);
  const userBookRequests=await Request.aggregate([
    {
      $match:{
        user:userId
      }
    },
    {
        $lookup:{
        from:"reviews",
        localField:"book",
        foreignField:"postedFor",
        as:"review"
      }
    },{
      $unwind:{
        path: "$review",
        preserveNullAndEmptyArrays: true
      }
    }
  ])

  console.log(userBookRequests);

  const oldBooksHistory=userBookRequests.filter((bookReq)=>bookReq.status==="Returned"||bookReq.status==="Collected");
  return res.status(200).json({
    status:"Success",
    data:oldBooksHistory
  })
})
