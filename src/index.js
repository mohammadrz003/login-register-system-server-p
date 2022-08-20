import cors from "cors";
import { join } from "path";
import consola from "consola";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { json } from "body-parser";

// Import application constants
import { DB, PORT } from "./constants";

// Router imports
import userApis from "./apis/users";
import profileApis from "./apis/profiles";

// Import passport middleware
require("./middlewares/passpost-middleware");

// Initialize express application
const app = express();

// Apply application middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(express.static(join(__dirname, "./uploads")));

// Inject sub router and apis
app.use("/api/users", userApis);
app.use("/api/profiles", profileApis);

const main = async () => {
  try {
    // Connect with the database
    await mongoose.connect(DB);
    consola.success("DATABASE CONNECTED...");
    // Start application listening for request on server
    app.listen(PORT, consola.success(`Server is running on port ${PORT}...`));
  } catch (error) {
    consola.error(`Unable to start the server \n${error.message}`);
  }
};

main();
