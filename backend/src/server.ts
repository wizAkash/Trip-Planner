import mongoose from "mongoose";
import buildApp from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || "0.0.0.0";
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/trip-planner";

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    const app = await buildApp();

    await app.listen({ port: Number(PORT), host: HOST });
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
