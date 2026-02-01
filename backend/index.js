
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// Local imports
import config from "./config.json" with { type: "json" };
import { User } from "./models/user-model.js";
import { Note } from "./models/note-model.js";
import { authenticateToken } from "./utilities.js";

const app = express();

// middlewares! Ye hamesha routes se upar hone chahiye 
app.use(express.json()); // Ye line zaroori hai req.body ke liye
app.use(cors({ origin: "*" }));


mongoose.connect(config.connectionString).then(() => {
    console.log("connected to mongodb successfully vro !!");
}).catch((err) => {
    console.error("error connecting to mongodb: ", err);
});

// ROUTES 

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
            { user:newUser },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3600m' }
        );

        return res.status(201).json({
            error: false,
            newUser,
            accessToken,
            message: "Registration Successful Bhaai!"
        });
    } catch (error) {

        return res.status(500).json({ error: true, message: "Internal Server Erroreee" });
    }
});


//login 
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
            name: userInfo.username,
            accessToken,
            message: "Login Successful!"
        });

    }

    catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
)



// Add notes 
app.post("/add-note", authenticateToken, async (req, res) => {

    try {
        const { title, content, tags } = req.body;

        const user = req.user;
        console.log("user in add note route:", user.user._id);

        if (!title) {
            return res.status(400).json({ error: true, message: "Note title is required!" })
        }
        if (!content) {
            return res.status(400).json({ error: true, message: "Note content is required!" })
        }

        console.log("helloo before new note created")

        const newNote = new Note({
            title,
            content,
            tags: tags || [],
            userId: user.user._id
        });

        console.log("helloo after new note created")
        console.log(newNote)

        await newNote.save();

        console.log("after saving new note")

        return res.status(201).json({
            error: false,
            newNote,
            message: "Note added successfully!"
        });


    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error bro!!" });
    }
});


// edit note here! bro
app.put("/edit-note/:nodeId", authenticateToken, async (req, res) => {
    try {
        console.log("edit notesssss")
        const noteId = req.params.nodeId;
        const { title, content, tags, isPinned } = req.body;
        const { user } = req.user;
        console.log(user)

        if (!title && !content && !tags) {
            return res.status(400).json({ error: true, message: "At least one field (title, content, tags) is required to update!" });
        }

        const note = await Note.findOne({ _id: noteId, userId: user._id });
        console.log(note)

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found!" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            error: false,
            note,
            message: "Note updated successfully!"
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while editing note!" });
    }
});


// getting notes api 
app.get("/get-all-notes", authenticateToken, async (req, res) => {
    try {
        const { user } = req.user;
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
        console.log(notes)

        return res.status(200).json({
            error: false,
            notes,
            message: "All the Notes fetched successfully!"
        });

    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error while fetching notes!" });
    }
})


// delete note api
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {

    try {
        const noteId = req.params.noteId;
        const { user } = req.user;
        const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found or already deleted!" });
        }

        

        return res.status(200).json({
            error: false,
            message: "Note deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while deleting note!" });
    }
});

//update isPinned status
app.put("/update-pin-status/:noteId", authenticateToken, async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { isPinned } = req.body;
        const { user } = req.user;

       

        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found!" });
        }

         if (isPinned !== undefined) note.isPinned = isPinned;
         else {
            note.isPinned = !note.isPinned;
         }

        await note.save();

        return res.status(200).json({
            error: false,
            note,
            message: "Note pinned status updated successfully!"
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while updating pin status!" });
    }
});

app.get("/get-user", authenticateToken, async (req, res) => {
    console.log("this is get user bro !")
    try {
        const { user } = req.user;

        if (!user) {
            return res.status(404).json({ error: true, message: "User not found!" });
        }

        return res.status(200).json({
            error: false,
            user,
            message: "User fetched successfully!"
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while fetching user!" });
    }
})




app.listen(5000, () => {
    console.log("express server started listening on port 5000");
});



//backend required APIs done so far needed ones
