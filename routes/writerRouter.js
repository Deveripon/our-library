import express from "express";
import {
    createNewWriter,
    deleteAllWriterFromDB,
    deleteSingleWriter,
    editSingleWriter,
    getAllWriter,
    getSingleWriterById,
    getSingleWriterBySlug,
} from "../controllers/writerRouteController.js";
import { writerAvaterUploader } from "../utils/uploader.js";
import { validateWriterForm } from "../middlewares/formValidation/writerFormValidation.js";
import { verifyAuthentication } from "../middlewares/common/varifyAuthentication.js";
const writerRouter = express.Router();
writerRouter.use(verifyAuthentication);
writerRouter.post("/", writerAvaterUploader, validateWriterForm, createNewWriter);
writerRouter.get("/", getAllWriter);
writerRouter.get("/:id", getSingleWriterById);
writerRouter.get("/slug/:slug", getSingleWriterBySlug);
writerRouter.patch("/edit/:id", writerAvaterUploader, validateWriterForm, editSingleWriter);
writerRouter.delete("/delete/:id", deleteSingleWriter);
writerRouter.delete("/delete-all", deleteAllWriterFromDB);
export default writerRouter;
