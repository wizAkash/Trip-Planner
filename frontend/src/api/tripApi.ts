import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getTrips = async (
  limit: number,
  offset: number,
  destination?: string,
  maxBudget?: number
) => {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());
  if (destination) params.append("destination", destination);
  if (maxBudget !== undefined) params.append("maxBudget", maxBudget.toString());

  const res = await axios.get(`${API_BASE_URL}/trips?${params.toString()}`);
  return res.data;
};

export const getTripById = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/trips/${id}`);
  return res.data;
};

export const addTrip = async (trip: {
  title: string;
  destination: string;
  days: number;
  budget: number;
}) => {
  const res = await axios.post(`${API_BASE_URL}/trips`, trip);
  return res.data;
};

export const editTrip = async (
  id: string,
  updates: Partial<{
    title: string;
    destination: string;
    days: number;
    budget: number;
  }>
) => {
  const res = await axios.patch(`${API_BASE_URL}/trips/${id}`, updates);
  return res.data;
};

export const deleteTrip = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/trips/${id}`);
  return res.data;
};
