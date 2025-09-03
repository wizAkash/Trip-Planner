import Fastify from "fastify";
import tripRoutes from "./routes/tripRoutes.js";
import cors from "@fastify/cors";

const app = Fastify({ logger: true });

async function buildApp() {
  await app.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  });

  app.register(tripRoutes, { prefix: "/api" });

  return app;
}

export default buildApp;
