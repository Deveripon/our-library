import express from "express";
import validateCategoryForm from "../middlewares/formValidation/categoryFormValidation.js";
import {
    createNewCategory,
    deleteAllCategoryFormDB,
    deleteSingleCategory,
    editSingleCategory,
    getAllCategory,
    getSingleCategory,
    getSingleCategoryBySlug,
} from "../controllers/categoryRouteController.js";
import { verifyAuthentication } from "../middlewares/common/varifyAuthentication.js";

const categoryRouter = express.Router();
categoryRouter.use(verifyAuthentication);
categoryRouter.post("/", validateCategoryForm, createNewCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.get("/slug/:slug", getSingleCategoryBySlug);
categoryRouter.patch("/edit/:id", validateCategoryForm, editSingleCategory);
categoryRouter.delete("/delete/:id", deleteSingleCategory);
categoryRouter.delete("/delete-all", deleteAllCategoryFormDB);

export default categoryRouter;
