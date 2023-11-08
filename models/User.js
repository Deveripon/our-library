import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
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
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        user_avater: {
            type: String,
            default: "avater.jpg",
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "admin",
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
export const User = mongoose.model("User", userSchema);
