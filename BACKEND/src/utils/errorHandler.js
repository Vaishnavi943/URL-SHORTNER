
// import {AppError} from '../errors/appError.js';

const errorHandler = (err, req , res, next ) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // to differentiate between operational and programming errors
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError{
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

export default errorHandler;
