import asyncHandler from "express-async-handler";
import { generateSlug } from "../helper/slugGenerator.js";
import { Category } from "../models/Category.js";
import { Book } from "../models/Book.js";

//create New Category
export const createNewCategory = asyncHandler(async (req, res) => {
    const slug = generateSlug(req.body.name);
    const data = new Category({ ...req.body, slug });
    await data.save();
    await Book.findByIdAndUpdate(req.body.books, { category: data._id });
    res.status(200).json({
        message: req.body.name + " Category Created successfully",
        data,
    });
});

//get all books
export const getAllCategory = asyncHandler(async (req, res) => {
    const data = await Category.find().populate("books");
    if (data.length > 0) {
        res.status(200).json({
            message: "Category Data found successfully",
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
export const getSingleCategory = asyncHandler(async (req, res) => {
    const data = await Category.findById(req.params.id).populate("books");
    if (data) {
        res.status(200).json({
            message: "Category Data found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//get single category by slug
export const getSingleCategoryBySlug = asyncHandler(async (req, res) => {
    const data = await Category.findOne({ slug: req.params.slug }).populate("books");
    if (data) {
        res.status(200).json({
            message: "Category Data found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//edit single category
export const editSingleCategory = asyncHandler(async (req, res) => {
    const slug = generateSlug(req.body.name);
    const data = await Category.findByIdAndUpdate(
        req.params.id,
        { ...req.body, slug },
        { new: true }
    );
    await Book.findByIdAndUpdate(req.body.books, { category: data._id });
    if (data) {
        res.status(200).json({
            message: "Book Updated successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete single category
export const deleteSingleCategory = asyncHandler(async (req, res) => {
    const data = await Category.findByIdAndDelete(req.params.id);
    if (data) {
        res.status(200).json({
            message: "Category Deleted successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete all data from db
export const deleteAllCategoryFormDB = asyncHandler(async (req, res) => {
    const data = await Category.deleteMany({});
    res.status(200).json({
        message: "All Data cleared successfully",
    });
});
