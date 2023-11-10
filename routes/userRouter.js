import express from "express";
import validateUserForm from "../middlewares/formValidation/userFormValidation.js";
import {
    createNewUser,
    deleteAllUser,
    deleteSingleUser,
    editSingleUser,
    getAllUser,
    getSingleUser,
} from "../controllers/userRouteController.js";
import { userAvaterUploader } from "../utils/uploader.js";
import { verifyAuthentication } from "../middlewares/common/varifyAuthentication.js";

const userRouter = express.Router();
userRouter.use(verifyAuthentication);

userRouter.post("/", userAvaterUploader, validateUserForm, createNewUser);
userRouter.get("/", getAllUser);
userRouter.get("/:id", getSingleUser);
userRouter.patch("/edit/:id", userAvaterUploader, validateUserForm, editSingleUser);
userRouter.delete("/delete/:id", deleteSingleUser);
userRouter.delete("/delete-all", deleteAllUser);

export default userRouter;
