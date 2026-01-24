// console.log("hello ")

import dotenv from "dotenv";
dotenv.config();


import mongoose from "mongoose";
import config from "./config.json" with { type: "json" };

console.log(config.connectionString)


mongoose.connect(config.connectionString).then(() => {
    console.log("connected to mongodb successfully ")
}).catch((err) => {
    console.error("error connecting to mongodb: ", err);
});


import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 5000;

app.use(
    cors(
        {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        }
    )
);




app.listen(5000, () => {
    console.log("express server started listening ")
})



app.get("/", (req, res) => {
    // res.send("hello from express server ")
    res.json({
        message: "hello from express server ",
        name: "express server",
        creator: "Nabeel"
    })
})




