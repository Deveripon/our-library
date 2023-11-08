import { Student } from "../../models/Student.js";

const validateStudentForm = async (req, res, next) => {
    const { name, email, cell } = req.body;
    if (!name) {
        next("Student Name is required");
    } else if (!email) {
        next("email is required");
    } else if (!cell) {
        next("cell is required");
    }
    // const is_email = await Student.findOne({ email: req.body.email });
    // const is_cell = await Student.findOne({ email: req.body.email });
    // if (is_email) {
    //     next("This Email is already exists");
    // } else if (is_cell) {
    //     next("This cell number is already exists");
    // }
    next();
};
export default validateStudentForm;
