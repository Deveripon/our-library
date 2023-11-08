import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },
        cell: {
            type: String,
            unique: true,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        dept: {
            type: String,
        },
        student_avater: {
            type: String,
            default: "student.jpg",
        },
        borrowed_books: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Book",
            default: [],
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
export const Student = mongoose.model("Student", studentSchema);
