import express from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { ContentModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {   await UserModel.create({
        username: username,
        password: password
    })

    res.json({
        message: "User signed up"
    })
    } catch(e) {
        res.status(411).json({
            message: "user already exists"
        })
    }
})
 
 
app.post("/api/v1/signin", async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    }) 
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json ({
            message: "wrong credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, (req,res) => {
    const link = req.body.link;
    const type = req.body.type;
    ContentModel.create({
        link, 
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    return res.json({
        message: "content added"
    })
})

app.get("/api/v1/content", (req,res) => {

})

app.listen(3000)