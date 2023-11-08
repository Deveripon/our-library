import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
        },
        sh_desc: {
            type: String,
        },
        books: {
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
export const Category = mongoose.model("Category", categorySchema);
