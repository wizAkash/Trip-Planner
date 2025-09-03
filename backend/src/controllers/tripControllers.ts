import { FastifyReply, FastifyRequest } from "fastify";
import { tripSchema } from "../schemas/tripSchema.js";
import * as tripService from "../services/tripService.js";
import { ZodError } from "zod";
import { TripInput } from "../schemas/tripSchema.js";
import { TripsQuery } from "../libs/interfaces.js";

export const addTrip = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const parsed = tripSchema.parse(req.body);
    const trip = await tripService.createTrip(parsed);
    return reply.code(201).send(trip);
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.code(400).send({ error: error.message });
    }
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message });
    }
    return reply.code(400).send({ error: "Unknown error" });
  }
};

export const getTrips = async (
  _req: FastifyRequest<{ Querystring: TripsQuery }>,
  reply: FastifyReply
) => {
  try {
    const { limit = 10, offset = 0, destination, maxBudget } = _req.query;

    const [trips, total] = await Promise.all([
      tripService.getFilteredTrips({
        limit,
        offset,
        destination: destination as string,
        maxBudget,
      } as TripsQuery),
      tripService.getFilteredTripsCount({
        destination: destination as string,
        maxBudget,
      } as TripsQuery),
    ]);

    return reply.send({ trips, total });
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message });
    }
  }
};

export const editTrip = async (
  req: FastifyRequest<{ Params: { id: string }; Body: Partial<TripInput> }>,
  reply: FastifyReply
) => {
  try {
    const trip = await tripService.updateTrip(req.params.id, req.body);
    if (!trip) return reply.code(404).send({ message: "Trip not found" });
    return reply.send(trip);
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message });
    }
  }
};

export const deleteTrip = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const trip = await tripService.deleteTripById(req.params.id);

    if (!trip) {
      return reply.code(404).send({ message: "Trip not found" });
    }

    return reply.code(200).send({ message: "Trip deleted successfully", trip });
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message });
    }
  }
};

export const getTripById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const trip = await tripService.findTripById(req.params.id);
    if (!trip) {
      return reply.code(404).send({ message: "Trip not found" });
    }
    return reply.send(trip);
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(400).send({ error: error.message });
    }
  }
};
