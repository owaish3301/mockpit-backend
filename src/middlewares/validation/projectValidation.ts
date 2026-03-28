import { UnprocessableEntity } from "../../lib/errors/HttpError.js";
import { projectNameValidation } from "../../validation/projectValidationSchemas.js";
import type { Request, Response, NextFunction } from "express";

export default function validateProjectName(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const parsedName = projectNameValidation.safeParse(req.body.name);
    if (!parsedName.success) {
      throw new UnprocessableEntity({ errorMessage: parsedName.error.message });
    }
    next();
  } catch (err) {
    return next(err);
  }
}
