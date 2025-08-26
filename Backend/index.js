const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
mongoose
  .connect(
    process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD)
  )
  .then(() => console.log("db connected...."))
  .catch((err) => console.log(err));

const userRouter = require("./Routes/UserRoutes");
const bookRouter = require("./Routes/BookRoutes");
const issueRouter = require("./Routes/IssueRoutes");
const issuedBookRouter = require("./Routes/IssuedBookRoutes");
const { AppError } = require("./Middlwares/AppError");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/issueBook", issueRouter);
app.use("/api/v1/issuedBooks", issuedBookRouter);

app.use(AppError);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
