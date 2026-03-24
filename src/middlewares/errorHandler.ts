import type { ErrorRequestHandler } from "express";
import AppError from "../lib/errors/AppError.js";
import { InternalError } from "../lib/errors/HttpError.js";

function toAppError(err: unknown) {
  if (err instanceof AppError) {
    return err;
  }

  return new InternalError({
    errorMessage: "An internal server error occured. Please try again later!",
  });
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const appError = toAppError(err);
};
