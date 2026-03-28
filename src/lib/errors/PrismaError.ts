import type { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ConflictError } from "./HttpError.js";

export default function handlePrismaKnownError(
  err: PrismaClientKnownRequestError,
) {
  if (err.code === "P2002") {
    return new ConflictError({
      errorMessage:
        "Similar data already exists. Please try again with different values.",
    });
  }
}
