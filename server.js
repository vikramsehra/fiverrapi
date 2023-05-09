import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/User.js";
import gigRoute from "./routes/Gig.js";
import conversationRoute from "./routes/Conversation.js";
import messageRoute from "./routes/Message.js";
import orderRoute from "./routes/Order.js";
import reviewRoute from "./routes/Review.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 8800;

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        handleError(error);
    }
};

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/gig", gigRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
})

app.listen(PORT, () => {
    connect();
    console.log("Backend server is running");
})