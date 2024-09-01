import Story from "../database/models/story.js";
import express from "express";
import asyncHandler from "express-async-handler";
import requester from "../requester.mjs";
import { infoLog } from "../logger.mjs";
// import { authenticateToken } from "../middleware/auth.js"; // Import the authenticateToken middleware

const routes = express.Router();

// Create a new story (protected route)
routes.post(
    "/stories",
    // authenticateToken, //authentication middleware here
    asyncHandler(async (req, res) => {
        const story = new Story(req.body);
        const savedStory = await story.save();
        res.status(201).json(savedStory);
    })
);

// Get all stories (protected route)
routes.get(
    "/stories",
    // authenticateToken, // authentication middleware here
    asyncHandler(async (req, res) => {
        const stories = await Story.find();

        if (!stories.length) {
            return res.status(404).json({ message: "No stories found" });
        }

        res.status(200).json(stories);
        infoLog(stories);
    })
);

// Get a specific story by ID (protected route)
routes.get(
    "/stories/:id",
    // authenticateToken, // authentication middleware here
    asyncHandler(async (req, res) => {
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json(story);
        infoLog(story);
    })
);

// Delete a story by ID (protected route)
routes.delete(
    "/stories/:id",
    // authenticateToken, //authentication middleware here
    asyncHandler(async (req, res) => {
        const result = await Story.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json({ message: "Story deleted successfully" });
    })
);

export default routes;
