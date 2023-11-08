import express from "express";
import { studentAvaterUploader } from "../utils/uploader.js";
import validateStudentForm from "../middlewares/formValidation/studentFormValidation.js";
import {
    createNewStudent,
    deleteAllStudentFromDB,
    deleteSingleStudent,
    editSingleStudent,
    getAllStudent,
    getSingleStudent,
    getSingleStudentBySlug,
} from "../controllers/studentRouteController.js";

const studentRouter = express.Router();

studentRouter.post("/", studentAvaterUploader, validateStudentForm, createNewStudent);
studentRouter.get("/", getAllStudent);
studentRouter.get("/:id", getSingleStudent);
studentRouter.patch("/edit/:id", studentAvaterUploader, validateStudentForm, editSingleStudent);
studentRouter.delete("/delete/:id", deleteSingleStudent);
studentRouter.delete("/delete-all", deleteAllStudentFromDB);
export default studentRouter;
