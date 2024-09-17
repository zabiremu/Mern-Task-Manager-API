import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import {
  MAX_JSON_SIZE,
  MAX_REQUEST,
  MONGO_URI,
  PORT,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./app/config/config.js";
import router from "./routes/api.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());

const limiter = rateLimit({ windowMs: REQUEST_TIME, max: MAX_REQUEST });
app.use(limiter);

app.set("etag", WEB_CACHE);
app.use("/api", router);

mongoose
  .connect(MONGO_URI, { autoIndex: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
app.listen(PORT, () => console.log("Server running on port " + PORT));
