import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../lib/prisma.js";
import createSlug from "../../utils/createSlug.js";
import type { Request, Response, NextFunction } from "express";
import { ConflictError } from "../../lib/errors/HttpError.js";

export default async function createProject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name } = req.body;
  const slug = createSlug(name);

  try {
    const project = await prisma.project.create({
      data: {
        name,
        slug,
      },
    });
    return res.status(201).json({
      data: project,
      message: "Project created.",
    });
  } catch (err) {
    if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === "P2002" &&
      (err.meta?.target as string[]).includes("slug")
    ) {
      return next(
        new ConflictError({
          errorMessage:
            "Similar project name already exists. Try again with a different name.",
        }),
      );
    }
    return next(err);
  }
}
