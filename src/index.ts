import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { project_router } from "./routes/project.js";

const app = express();

app.use(express.json());

app.use("/projects", project_router);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running");
});
