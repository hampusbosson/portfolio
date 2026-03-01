import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

type CreateAppOptions = {
  frontendOrigin?: string;
};

export function createApp({ frontendOrigin }: CreateAppOptions = {}) {
  const app = express();

  app.use(
    cors({
      origin: frontendOrigin || "*",
    }),
  );
  app.use(express.json({ limit: "1mb" }));

  app.use("/api", routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

