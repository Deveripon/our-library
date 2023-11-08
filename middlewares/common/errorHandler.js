import multer from "multer";

//404 error handler
export const __404NotFoundHandler = (req, res, next) => {
    next("404 Not Found");
};

export const __appErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(err.status || 500).json({
            error: err,
        });
    } else {
        if (err.message) {
            res.status(err.status || 500).json({
                error: err.message,
            });
        } else {
            res.status(err.status || 500).json({
                error: err,
            });
        }
    }
};
