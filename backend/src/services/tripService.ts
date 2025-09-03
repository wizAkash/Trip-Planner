import Trip, { TripPlan } from "../models/tripModel.js";
import { TripInput } from "../schemas/tripSchema.js";
import { TripsQuery } from "../libs/interfaces.js";

export const createTrip = async (data: TripInput): Promise<TripPlan> => {
  return await Trip.create(data);
};

export const getAllTrips = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<TripPlan[]> => {
  return await Trip.find().skip(offset).limit(limit);
};

export const updateTrip = async (
  id: string,
  data: Partial<TripInput>
): Promise<TripPlan | null> => {
  return await Trip.findByIdAndUpdate(id, data, { new: true });
};

export const findTripById = async (id: string): Promise<TripPlan | null> => {
  return await Trip.findById(id);
};

export const deleteTripById = async (id: string): Promise<TripPlan | null> => {
  return await Trip.findByIdAndDelete(id);
};

export const getTripsCount = async (): Promise<number> => {
  return await Trip.countDocuments();
};

export const getFilteredTrips = async ({
  limit,
  offset,
  destination,
  maxBudget,
}: TripsQuery): Promise<TripPlan[]> => {
  const filter: any = {};

  if (destination) {
    filter.destination = { $regex: destination, $options: "i" };
  }
  if (maxBudget !== undefined) {
    filter.budget = { $lte: maxBudget };
  }

  const limitNum = Number(limit) || 10;
  const offsetNum = Number(offset) || 0;

  return await Trip.find(filter).skip(offsetNum).limit(limitNum);
};

export const getFilteredTripsCount = async ({
  destination,
  maxBudget,
}: Omit<TripsQuery, "limit" | "offset">): Promise<number> => {
  const filter: any = {};
  if (destination) {
    filter.destination = { $regex: destination, $options: "i" };
  }
  if (maxBudget !== undefined) {
    filter.budget = { $lte: maxBudget };
  }
  return await Trip.countDocuments(filter);
};
