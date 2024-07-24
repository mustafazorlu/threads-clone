import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config(); //dotenv
connectDB(); //database
const app = express();

//1:41:21

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => console.log(`server started at ${PORT}`));
