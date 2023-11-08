import { Category } from "../../models/Category.js";

const validateCategoryForm = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        next("Category name is required");
    }
    const data = await Category.findOne({ name: req.body.name });
    if (data) {
        next("This Category has been already Created");
    }
    next();
};
export default validateCategoryForm;
