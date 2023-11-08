import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
//create new user
export const createNewUser = asyncHandler(async (req, res) => {
    const data = new User({ ...req.body });
    await data.save();
    res.status(200).json({
        message: req.body.name + " Student Added successfully",
        data,
    });
});
//get all books
export const getAllUser = asyncHandler(async (req, res) => {
    const data = await User.find();
    if (data.length > 0) {
        res.status(200).json({
            message: "User found successfully",
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
export const getSingleUser = asyncHandler(async (req, res) => {
    const data = await User.findById(req.params.id);
    if (data) {
        res.status(200).json({
            message: "User found successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//edit single category
export const editSingleUser = asyncHandler(async (req, res) => {
    const { name, role, status, trash } = req.body;
    const data = await User.findByIdAndUpdate(
        req.params.id,
        { name, role, status, trash },
        { new: true }
    );
    if (data) {
        res.status(200).json({
            message: "User Updated successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete single category
export const deleteSingleUser = asyncHandler(async (req, res) => {
    const data = await User.findByIdAndDelete(req.params.id);
    if (data) {
        res.status(200).json({
            message: "User Deleted successfully",
            data,
        });
    } else {
        res.status(404).json({
            message: "No data found",
        });
    }
});

//delete all data from db
export const deleteAllUser = asyncHandler(async (req, res) => {
    const data = await User.deleteMany({});
    res.status(200).json({
        message: "All Data cleared successfully",
    });
});
