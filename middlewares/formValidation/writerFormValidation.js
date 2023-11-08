import { Writer } from "../../models/Writer.js";

export const validateWriterForm = async (req, res, next) => {
    const { name, sh_desc_with_period } = req.body;

    if (!name) {
        next("Name is required");
    } else if (!sh_desc_with_period) {
        next("Short description with Period is required");
    }
    const writer = await Writer.findOne({ name: name });
    if (writer) {
        next("Writer already exists");
    }
    next();
};
