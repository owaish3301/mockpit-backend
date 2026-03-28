import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import { BadRequest } from "../../lib/errors/HttpError.js";

export async function getAllProjects(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const pageNum =
    Number(req.query.page) < 1 ? 1 : Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (pageNum - 1) * take;
    
    const q =
      typeof req.query.q === "string" && req.query.q.trim()
        ? req.query.q.trim()
        : undefined;

    const from = req.query.from
      ? new Date(req.query.from as string)
      : undefined;
    const to = req.query.to ? new Date(req.query.to as string) : undefined;

    if (from && isNaN(from.getTime())) {
      throw new BadRequest({ errorMessage: "Invalid from date." });
    }
    if (to && isNaN(to.getTime())) {
      throw new BadRequest({ errorMessage: "Invalid to date." });
    }

    const allowedSortField = ["created_at", "updated_at", "name"] as const;
    type SortField = (typeof allowedSortField)[number];

    const sortByRaw = req.query.sortBy;

    let sortBy: SortField = "created_at";

    if (
      typeof sortByRaw === "string" &&
      allowedSortField.includes(sortByRaw as SortField)
    ) {
      sortBy = sortByRaw as SortField;
    }

    const order =
      req.query.order === "asc" || req.query.order === "desc"
        ? req.query.order
        : "desc";

    const where: Prisma.ProjectWhereInput = {};
    if (q) {
      where.OR = [
        {
          name: {
            contains: q,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          slug: {
            contains: q,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ];
    }

    if (from || to) {
      where.created_at = {
        ...(from && { gte: from }),
        ...(to && { lte: to }),
      };
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        take: take,
        skip,
        where,
        orderBy: {
          [sortBy]: order,
        },
      }),
      prisma.project.count({ where: where }),
    ]);
    return res.status(200).json({
      success: true,
      data: { projects },
      hasMore: skip + projects.length < total ? true : false,
      page: pageNum,
      length: projects.length,
    });
  } catch (err) {
    return next(err);
  }
}
