//load dependencies
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { getConnectionToMongoDB } from "./config/mongodbConnection.js";
import { __404NotFoundHandler, __appErrorHandler } from "./middlewares/common/errorHandler.js";
import bookRouter from "./routes/bookRouter.js";
import writerRouter from "./routes/writerRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
dotenv.config();

//initalize express app
const app = express();

//use express middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));
app.use(cookieParser());
app.set("view engine", "ejs");

//use routers
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/writers", writerRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

//use errorHandler
app.use(__404NotFoundHandler);
app.use(__appErrorHandler);

//server listen
app.listen(process.env.PORT || 6060, () => {
    //connect database
    getConnectionToMongoDB(process.env.MONGODB_CONNECTION_STRING);
    console.log(` Server listening on port ${process.env.PORT || 6060} `.bgGreen.blue);
});
