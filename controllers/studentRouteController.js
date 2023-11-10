import asyncHandler from "express-async-handler";
import { Student } from "../models/Student.js";
import { generateSlug } from "../helper/slugGenerator.js";
import { Book } from "../models/Book.js";

//create New Student
export const createNewStudent = asyncHandler(async (req, res) => {
    const slug = generateSlug(req.body.name);
    const { borrowed_books } = req.body;
    const data = new Student({ ...req.body, slug });
    await data.save();
    if (borrowed_books.length > 0) {
        for (let i = 0; i < borrowed_books.length; i++) {
            Book.findByIdAndUpdate(borrowed_books[i], { $push: { borrowed_by: data._id } });
        }
    }
    res.status(200).json({
        message: req.body.name + " Student Added successfully",
        data,
    });
});

//get all books
export const getAllStudent = asyncHandler(async (req, res) => {
    const data = await Student.find().populate("borrowed_books");
    if (data.length > 0) {
        res.status(200).json({
            message: "Student Data found successfully",
            dataCount: data.length,
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//get single category by id
export const getSingleStudent = asyncHandler(async (req, res) => {
    const data = await Student.findById(req.params.id).populate("borrowed_books");
    if (data) {
        res.status(200).json({
            message: "Strudent Data found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//get single category by slug
export const getSingleStudentBySlug = asyncHandler(async (req, res) => {
    const data = await Student.findOne({ slug: req.params.slug }).populate("borrowed_books");
    if (data) {
        res.status(200).json({
            message: "Student Data found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//edit single category
export const editSingleStudent = asyncHandler(async (req, res) => {
    const slug = generateSlug(req.body.name);
    const data = await Student.findByIdAndUpdate(
        req.params.id,
        { ...req.body, slug },
        { new: true }
    );
    if (data) {
        res.status(200).json({
            message: "Student Updated successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete single category
export const deleteSingleStudent = asyncHandler(async (req, res) => {
    const data = await Student.findByIdAndDelete(req.params.id);
    if (data) {
        res.status(200).json({
            message: "Student Deleted successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete all data from db
export const deleteAllStudentFromDB = asyncHandler(async (req, res) => {
    const data = await Student.deleteMany({});
    res.status(200).json({
        message: "All Data cleared successfully",
    });
});
