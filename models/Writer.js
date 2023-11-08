import mongoose from "mongoose";

const writerSchema = mongoose.Schema(
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
        sh_desc_with_period: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
        writer_avater: { type: String, default: "writer.jpg" },
        books: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Book",
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
export const Writer = mongoose.model("Writer", writerSchema);
