import type { ErrorRequestHandler } from "express";
import AppError from "../lib/errors/AppError.js";
import { InternalError } from "../lib/errors/HttpError.js";
import { PrismaClientInitializationError } from "@prisma/client/runtime/client";

function toAppError(err: unknown) {
  if (err instanceof AppError) {
    return err;
  }

  if (err instanceof PrismaClientInitializationError) {
    return new InternalError({
      errorMessage:
        "An internal server error has occured. Please try again later!",
      isOperational: false,
    });
  }

  return new InternalError({
    errorMessage: "An internal server error occured. Please try again later!",
  });
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const appError = toAppError(err);

  res.status(appError.statusCode).json({
    error: {
      errorCode: appError.errorCode,
      message: appError.errorMessage,
    },
    success: false,
  });

  // TODO: using appError.isOperational we can build a fault tolenrence or alert systems later on
};
