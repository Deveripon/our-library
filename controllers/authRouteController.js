import jwt from "jsonwebtoken";

export const getLoginPage = (req, res) => {
    res.render("login/login.ejs");
};

export const getLogin = async (req, res) => {
    const token = jwt.sign({ user: req.body.userInfo }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV !== "production" ? true : false,
    });
    res.render("login/document");
};

export const getLogout = (req, res) => {
    res.clearCookie("access_token");
    res.redirect("/api/v1/auth/login");
};
