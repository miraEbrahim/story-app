import express from "express";
import listEndpoints from "express-list-endpoints";
import proxyRoutes from "./routes/proxy.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = 8081;

app.use(
    cors({
        origin: ["http://localhost:3000","http://localhost:3001", "http://localhost:3002"], // Adjust ports as needed
    })
);


app.use(express.json()); // Parse JSON request bodies

// MongoDB connection logic
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit process with failure if the connection fails
    }
};

// Register the imported routes
app.use("/api/proxy", proxyRoutes);

// Health check endpoint
app.get("/api/check-health", (req, res) => {
    res.status(200).send({ status: 200 });
});

// Get all routes
app.get("/api/get-all-routes", (req, res) => {
    res.json(
        listEndpoints(app).map(({ path, methods }) => ({ path, methods }))
    );
});

// Start the server
const startServer = async () => {
    await connectDB(); // Ensure database is connected before starting the server

    app.listen(port, () => {
        console.log(`Story app listening on port ${port}`);
    }).on("error", (err) => {
        console.error("Failed to start server:", err);
        process.exit(1); // Exit process with failure if the server fails to start
    });
};

startServer();
