import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"postedBy is required"]
    },

    postedFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:[true,"postedFor is required"]
    },

    review:{
        type:String,
        required:[true,"Review is required"]
    },
    rating:{
        type:Number,
        required:[true,"Rating is required"]
    }
})

const reviewModel=mongoose.model("Review",reviewSchema);

export default reviewModel;