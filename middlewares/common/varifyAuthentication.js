import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
export const verifyAuthentication = asyncHandler(async (req, res, next) => {
    const token = req.cookies.access_token;
    const decode = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            next("Sorry ! You are not authorized to access this link");
            res.redirect("/api/v1/auth/login");
        } else {
            next();
        }
    });
});
