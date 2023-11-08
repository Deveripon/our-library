import { Book } from "../../models/Book.js";

const validateForm = async (req, res, next) => {
    const reqURL = req.originalUrl;
    const editUrl = "api/v1/books/edit";
    const is_edit = reqURL.match(editUrl);
    if (!is_edit) {
        const { title, writer } = req.body;
        if (!title) {
            next("Book Title is required");
        }
        const data = await Book.findOne({ title: req.body.title });
        if (data) {
            next("This Book has been already published");
        }
    }
    next();
};
export default validateForm;
