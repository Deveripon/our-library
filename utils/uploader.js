import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "user_avatar") {
            cb(null, "public/uploads/users");
        } else if (file.fieldname === "book_coverPhoto") {
            cb(null, "public/uploads/books");
        } else if (file.fieldname === "student_avater") {
            cb(null, "public/uploads/students");
        } else if (file.fieldname === "writer_avater") {
            cb(null, "public/uploads/writers");
        }
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        let filename =
            file.originalname.replace(extname, "").split(" ").join("_") +
            "_" +
            Math.floor(Math.random() * 10000) +
            "_" +
            Date.now().toString() +
            extname;
        cb(null, filename);
    },
});

export const bookCoverPhotoUplaoder = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/webp"
        ) {
            cb(null, true);
        } else {
            throw new Error(
                "Invalid File Type: " +
                    file.mimetype +
                    "Only JPEG , JPG , PNG and Webp are supported"
            );
        }
    },
    limits: 1000000,
}).single("book_coverPhoto");

export const writerAvaterUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/webp"
        ) {
            cb(null, true);
        } else {
            throw new Error(
                "Invalid File Type: " +
                    file.mimetype +
                    "Only JPEG , JPG , PNG and Webp are supported"
            );
        }
    },
    limits: 1000000,
}).single("writer_avater");

export const studentAvaterUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/webp"
        ) {
            cb(null, true);
        } else {
            throw new Error(
                "Invalid File Type: " +
                    file.mimetype +
                    "Only JPEG , JPG , PNG and Webp are supported"
            );
        }
    },
    limits: 1000000,
}).single("student_avater");

export const userAvaterUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/webp"
        ) {
            cb(null, true);
        } else {
            throw new Error(
                "Invalid File Type: " +
                    file.mimetype +
                    "Only JPEG , JPG , PNG and Webp are supported"
            );
        }
    },
    limits: 1000000,
}).single("user_avater");
