import express from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {await UserModel.create({
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

app.post("/api/v1/content", userMiddleware, async (req,res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link, 
        type,
        userId: req.userId,
        tags: []
    })

    return res.json({
        message: "content added"
    })
})

app.get("/api/v1/content", userMiddleware, async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.get("/api/v1/brain/share", userMiddleware, async(req,res) => {
    const share = req.body.share;
    if (share) {
       await LinkModel.create({
            userId: req.userId,
            hash: random(10),
        })
    } else {
       await LinkModel.deleteOne({
            userId: req.userId
        })
    }
})

app.get("/api/v1/brain/:shareLink", async(req,res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "incorrect input"
        })
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        userId: link.userId
    })

      if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
});
app.listen(3000);