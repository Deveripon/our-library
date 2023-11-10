import mongoose, { Schema } from "mongoose";
import { Category } from "../models/Category.js";
import { Student } from "../models/Student.js";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
        },
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Writer",
        },
        translated_by: {
            type: String,
        },
        book_coverPhoto: { type: String, default: "cover.jpg" },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Category,
        },
        borrowed_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
        status: {
            type: Boolean,
            default: true,
        },
        trash: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
