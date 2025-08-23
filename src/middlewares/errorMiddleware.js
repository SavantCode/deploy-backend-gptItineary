import { ApiError } from "../utils/ApiError.js";

/**
 * Global error handling middleware for the Express application.
 * It must be the last middleware registered in the app to function as a catch-all.
 *
 * This function handles two types of errors:
 * 1. Known errors (`ApiError`): These are operational errors we throw intentionally
 * (e.g., resource not found, invalid input). We send back the specific status
 * code and message from the error.
 * 2. Unknown errors: These are unexpected bugs or system failures. For these, we
 * log the full error for debugging but send a generic 500 "Internal Server Error"
 * message to the client to avoid leaking sensitive implementation details.
 *
 * @param {Error | ApiError} err - The error object passed from a previous middleware or route handler.
 * @param {import("express").Request} req - The Express request object.
 * @param {import("express").Response} res - The Express response object.
 * @param {import("express").NextFunction} next - The Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    // If the error is an instance of our custom ApiError, use its properties.
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    // For any other kind of unexpected error, log it and return a generic 500 response.
    console.error('UNHANDLED ERROR STACK: ', err.stack);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

export { errorHandler };


// const errorMiddleware = (err, req, res, next) => {
//   console.error('Error:', err.stack || err.message);
//   const status = err.status || 500;
//   res.status(status).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//   });
// };

// export default errorMiddleware;