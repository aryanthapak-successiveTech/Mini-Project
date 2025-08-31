import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A book must have an Name"],
  },
  author: {
    type: String,
    required: [true, "A book must have an Author"],
  },
  ISBN: {
    type: Number,
    required: [true, "A book must have an ISBN"],
  },
  description:{
    type:String,
    required: [true, "A book must have an Description"],
  },
  qty:{
    type:Number,
    required:[true,"A book must have a qunatity"]
  },
  eBookAddress:{
    type:String,
  }
});

bookSchema.methods.Approve=async function (){
  this.qty=qty--;
  await this.save();
}

const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;
