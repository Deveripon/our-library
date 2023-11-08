import express from "express";
import {
    createNewBook,
    deleteAllBookData,
    deleteSingleBookById,
    editSingleBookData,
    getAllBook,
    getSingleBookById,
    getSingleBookBySlug,
} from "../controllers/bookRouteController.js";
import { bookCoverPhotoUplaoder } from "../utils/uploader.js";
import validateForm from "../middlewares/formValidation/bookFormValidation.js";

const bookRouter = express.Router();
bookRouter.post("/", bookCoverPhotoUplaoder, validateForm, createNewBook);
bookRouter.get("/", getAllBook);
bookRouter.get("/:id", getSingleBookById);
bookRouter.get("/slug/:slug", getSingleBookBySlug);
bookRouter.patch("/edit/:id", bookCoverPhotoUplaoder, validateForm, editSingleBookData);
bookRouter.delete("/delete/:id", deleteSingleBookById);
bookRouter.delete("/delete-all", deleteAllBookData);
export default bookRouter;
