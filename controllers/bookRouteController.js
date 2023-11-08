import asyncHandler from "express-async-handler";
import { generateSlug } from "../helper/slugGenerator.js";
import { Book } from "../models/Book.js";
import { Writer } from "../models/Writer.js";

//create a new book
export const createNewBook = asyncHandler(async (req, res) => {
    const slug = generateSlug(req.body.title);
    const book_coverPhoto = req.file.filename;
    const data = new Book({ ...req.body, slug: slug, book_coverPhoto: book_coverPhoto });
    const { writer } = req.body;
    await data.save();

    if (writer) {
        await Writer.findByIdAndUpdate(writer, { $push: { books: data._id } });
    }

    await data.save();
    res.status(200).json({
        message: "Book saved successfully",
        data,
    });
});

//get all books
export const getAllBook = asyncHandler(async (req, res) => {
    const data = await Book.find().populate("writer").populate("category").populate("borrowed_by");
    if (data.length > 0) {
        res.status(200).json({
            message: "Book Data found successfully",
            dataCount: data.length,
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//get single book by id
export const getSingleBookById = asyncHandler(async (req, res) => {
    const data = await Book.findById(req.params.id)
        .populate("writer")
        .populate("category")
        .populate("borrowed_by");
    if (data) {
        res.status(200).json({
            message: "Book Data found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//get single book by slug
export const getSingleBookBySlug = asyncHandler(async (req, res) => {
    const data = await Book.findOne({ slug: req.params.slug })
        .populate("writer")
        .populate("category")
        .populate("borrowed_by");
    if (data) {
        res.status(200).json({
            message: "Book Data found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//edit single student
export const editSingleBookData = asyncHandler(async (req, res) => {
    const slug = generateSlug(req.body.title);
    const data = await Book.findByIdAndUpdate(req.params.id, { ...req.body, slug }, { new: true });
    const { writer } = req.body;
    await data.save();
    if (writer) {
        await Writer.findByIdAndUpdate(writer, { $push: { books: data._id } });
    }
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

//delete single student
export const deleteSingleBookById = asyncHandler(async (req, res) => {
    const data = await Book.findByIdAndDelete(req.params.id);
    if (data) {
        res.status(200).json({
            message: "Book Deleted successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete all data from db
export const deleteAllBookData = asyncHandler(async (req, res) => {
    const data = await Book.deleteMany({});
    res.status(200).json({
        message: "All Data cleared successfully",
    });
});
