import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A book must have a Name"],
  },
  author: {
    type: String,
    required: [true, "A book must have a Author"],
  },
  ISBN: {
    type: Number,
  },
  description:{
    type:String
  },
  qty:{
    type:Number
  }
});

bookSchema.methods.Approve=async function (){
  this.qty=qty--;
  await this.save();
}

const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;
