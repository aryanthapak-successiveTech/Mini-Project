const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: [
      "Approved",
      "Rejected",
      "Pending",
      "Returned",
      "Collected",
      "Not Collected",
    ],
    default: "Pending",
  },
  issueTime: {
    type: Date,
    default: Date.now,
  },
  returnTime: {
    type: Date,
  },

  fine: {
    type: Number,
    default: 0,
  },
});

requestSchema.pre("save", function (next) {
  if (this.status === "Not Collected") {
    this.status = "Rejected";
  }

  if (this.status === "Returned") {
    const now=Date.now();
    this.returnTime = now;
    const timeDiff=now-this.issueTime;
    const daysDiff=Math.floor(timeDiff/(24*60*60*1000));
    const lateDays=daysDiff-15<=0?0:daysDiff-15;
    this.fine=lateDays*5;
  }
  next();
});

const requestModel = mongoose.model("Request", requestSchema);
module.exports = requestModel;
