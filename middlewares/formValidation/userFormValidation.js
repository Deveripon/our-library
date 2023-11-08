import { User } from "../../models/User.js";

const validateUserForm = async (req, res, next) => {
    const reqURL = req.originalUrl;
    const editUrl = "api/v1/users/edit";
    const is_edit = reqURL.match(editUrl);
    const { name, email, cell, username, password } = req.body;
    if (!is_edit) {
        if (!name) {
            next(" name is required");
        } else if (!email) {
            next("Email is required");
        } else if (!cell) {
            next("Cell is required");
        } else if (!username) {
            next("username is required");
        } else if (!password) {
            next("password is required");
        }
        const is_email = await User.findOne({ email: req.body.email });
        const is_cell = await User.findOne({ cell: req.body.cell });
        const is_username = await User.findOne({ username: req.body.username });
        if (is_email) {
            next("This email is already in use");
        } else if (is_username) {
            next("This username has taken");
        } else if (is_cell) {
            next("This cell is already taken");
        }
    }
    next();
};
export default validateUserForm;
