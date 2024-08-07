import { Response } from 'express';

// General error handling function
export function handleError(res: Response, error: unknown, statusCode: number = 400): void {
    if (error instanceof Error) {
        console.error("Error:", error.message, "Status: " + statusCode); // Log the error for server-side visibility
        res.status(statusCode).json({ message: error.message });
    } else {
        console.error("Unknown error:", error);
        res.status(statusCode).json({ message: "An unknown error occurred" });
    }
}
