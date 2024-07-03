"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
// General error handling function
function handleError(res, error, statusCode = 400) {
    if (error instanceof Error) {
        console.error("Error:", error.message, "Status: " + statusCode); // Log the error for server-side visibility
        res.status(statusCode).json({ message: error.message });
    }
    else {
        console.error("Unknown error:", error);
        res.status(statusCode).json({ message: "An unknown error occurred" });
    }
}
