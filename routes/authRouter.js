import express from "express";
import { validateAuthentication } from "../middlewares/formValidation/authValidation.js";
import { getLogin, getLoginPage, getLogout } from "../controllers/authRouteController.js";

const authRouter = express.Router();
authRouter.post("/login", validateAuthentication, getLogin);
authRouter.get("/logout", getLogout);
authRouter.get("/login", getLoginPage);

export default authRouter;
