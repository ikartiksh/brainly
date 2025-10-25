<<<<<<< HEAD
import jwt, {} from "jsonwebtoken";
=======
//@ts-ignore
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
>>>>>>> b218b18f6a932ca3704b95f7ac6f76a38d3a81b6
import { JWT_PASSWORD } from "./config.js";
export const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header, JWT_PASSWORD);
    if (decoded) {
<<<<<<< HEAD
        if (typeof decoded == "string") {
            res.status(403).json({
                message: "you are not logged in"
            });
            return;
        }
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(411).json({
=======
        //@ts-ignore
        req.userId = decode.id;
        next();
    }
    else {
        res.status(403).json({
>>>>>>> b218b18f6a932ca3704b95f7ac6f76a38d3a81b6
            message: "you are not logged in"
        });
    }
};
//# sourceMappingURL=middleware.js.map