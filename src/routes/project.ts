import { Router } from "express";
import createProject from "../controller/project/createProject.js";
import validateProjectName from "../middlewares/validation/projectValidation.js";
import { getAllProjects } from "../controller/project/getProject.js";

const router = Router();

router.get("/", getAllProjects);
//router.get(":projectId");
router.post("/", validateProjectName, createProject);
//router.delete("/");
//router.patch("/");

export { router as project_router };
