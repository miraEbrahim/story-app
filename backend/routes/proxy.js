import express from "express";
import storyRoutes from "./story.js";


const proxyRouter = express.Router();

proxyRouter.use("", storyRoutes);

export default proxyRouter;