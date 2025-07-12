import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails: any = [];

  // Zod validation error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errorDetails = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Custom AppError
  else if (err.name === "AppError" || err instanceof AppError) {
    statusCode = err?.statusCode || 500;
    message = err.message;
  }

  // Mongoose ValidationError
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = err._message || "Mongoose validation error";
    errorDetails = Object.values(err.errors).map((e: any) => ({
      path: e.path,
      message: e.message,
    }));
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    // stack: err.stack, // Uncomment in dev only
  });
};

export default globalErrorHandler;
