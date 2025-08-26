const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"]
  },

  email: {
    type: String,
    validate: [validator.isEmail, "Enter a valid Email address"],
  },

  password: {
    type: String,
    minlength: 8,
    select:false
  },

  enrollmentNumber: {
    type: String,
    unique: true,
  },

  branch:{
    type:String,
    required:[true,"Branch is required"]
  },

  role: {
    type: String,
    enum: ["Admin", "Student"],
    required:[true,"Role is required"]
  },

  college: {
    type: String,
    required:[true,"College is Required"]
  },

  bookRequests:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"Request"
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
