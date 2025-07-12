import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

let server: Server;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database Connected ✅");

    server = app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();
