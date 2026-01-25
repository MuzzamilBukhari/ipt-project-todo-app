
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// Local imports
import config from "./config.json" with { type: "json" };
import { User } from "./user-model.js";
import { authenticateToken } from "./utilities.js";

const app = express();

// middlewares! (Ye hamesha routes se upar hone chahiye) 
app.use(express.json()); // Ye line zaroori hai req.body ke liye
app.use(cors({ origin: "*" }));


mongoose.connect(config.connectionString).then(() => {
    console.log("connected to mongodb successfully");
}).catch((err) => {
    console.error("error connecting to mongodb: ", err);
});

// --- ROUTES ---

app.get("/", (req, res) => {
    // res.send("hello from express server ")
    res.json({
        message: "hello from express server ",
        name: "express server",
        creator: "Nabeel"
    })
})


// Create Account Route
app.post("/create-account", async (req, res) => {
    console.log("post method callled")
    try {

        const { username, email, password } = req.body;



        if (!username) {

            return res.status(400).json({ error: true, message: "Full name is required!" })
        }


        if (!email) {
            return res.status(400).json({ error: true, message: "user email is required!" })
        }

        if (!password) {
            return res.status(400).json({ error: true, message: "user password is required!" })
        }

        const isUser = await User.findOne({ email: email });

        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists with this email!" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const accessToken = jwt.sign(
            { newUser },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3600m' }
        );

        return res.status(201).json({
            error: false,
            newUser,
            accessToken,
            message: "Registration Successful!"
        });
    } catch (error) {

        return res.status(500).json({ error: true, message: "Internal Server Erroreee" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: true, message: "user email is required!" })
        }

        if (!password) {
            return res.status(400).json({ error: true, message: "user password is required!" })
        }

        const userInfo = await User.findOne({ email: email, password: password });
        console.log(userInfo)
        // console.log(userInfo.email)

        if (!userInfo) {
            return res.status(401).json({ error: true, message: "Invalid email or password!" });
        }

        
            const user = { user: userInfo };
            const accessToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '3600m' }
            );

            return res.status(200).json({
                error: false,
                email: userInfo.email,
                accessToken,
                message: "Login Successful!"
            });
         
        }



    

    catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
)




app.listen(5000, () => {
    console.log("express server started listening on port 5000");
});

