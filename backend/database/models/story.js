import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    },
    { collection: "stories" }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
