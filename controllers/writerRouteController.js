import asyncHandler from "express-async-handler";
import { Writer } from "../models/Writer.js";
import { generateSlug } from "../helper/slugGenerator.js";
import { Book } from "../models/Book.js";

//create new writer
export const createNewWriter = asyncHandler(async (req, res) => {
    const slug = generateSlug(req.body.name);
    const writer_avater = req.file.path;
    const bookList = req.body.books;
    const data = new Writer({ ...req.body, slug, writer_avater });
    await data.save();
    await Book.findByIdAndUpdate(req.body.books, { writer: data.id });
    res.status(200).json({
        message: "Writer created successfully",
        data,
    });
});

//get all writer
export const getAllWriter = asyncHandler(async (req, res) => {
    const data = await Writer.find().populate("books");
    if (data.length > 0) {
        res.status(200).json({
            message: "Writer Data found successfully",
            dataCount: data.length,
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//get single writer by id
export const getSingleWriterById = asyncHandler(async (req, res) => {
    const data = await Writer.findById(req.params.id).populate("books");
    if (data) {
        res.status(200).json({
            message: "Writer Data found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//get single writer by slug
export const getSingleWriterBySlug = asyncHandler(async (req, res) => {
    const data = await Writer.findOne({ slug: req.params.slug }).populate("books");
    if (data) {
        res.status(200).json({
            message: "Writer Data found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//edit single writer
export const editSingleWriter = asyncHandler(async (req, res) => {
    const slug = generateSlug(req.body.name);
    const data = await Writer.findByIdAndUpdate(
        req.params.id,
        { ...req.body, slug },
        { new: true }
    );
    await Book.findByIdAndUpdate(req.body.books, { writer: data.id });
    if (data) {
        res.status(200).json({
            message: "Writer Updated successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete single writer
export const deleteSingleWriter = asyncHandler(async (req, res) => {
    const data = await Writer.findByIdAndDelete(req.params.id);
    if (data) {
        res.status(200).json({
            message: "Writer Deleted successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete all data from db
export const deleteAllWriterFromDB = asyncHandler(async (req, res) => {
    const data = await Writer.deleteMany({});
    res.status(200).json({
        message: "All Data cleared successfully",
    });
});
