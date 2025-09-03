import { FastifyInstance } from "fastify";
import {
  addTrip,
  getTrips,
  editTrip,
  deleteTrip,
  getTripById
} from "../controllers/tripControllers.js";

export default async function tripRoutes(fastify: FastifyInstance) {
  console.log(`\n\n Came her \n\n`);
  fastify.post("/trips", addTrip);
  fastify.get("/trips", getTrips);
  fastify.patch("/trips/:id", editTrip);
  fastify.delete("/trips/:id", deleteTrip);
  fastify.get("/trips/:id", getTripById);
}
