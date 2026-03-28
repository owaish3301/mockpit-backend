import { z } from "zod";

const projectNameValidation = z
  .string("Invalid data.")
  .min(1, "Project name can't be empty.")
  .max(120, "Project name should be less than 120 characters.");

export { projectNameValidation };
