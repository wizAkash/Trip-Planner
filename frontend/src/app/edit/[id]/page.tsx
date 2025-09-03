"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TripForm, { TripFormData } from "../../components/TripForm";
import { toast } from "react-toastify";
import { getTrips, editTrip, getTripById } from "@/api/tripApi";
import { Trip } from "@/libs/interfaces";

export default function EditTripPage() {
  const { id } = useParams();
  const tripId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [trip, setTrip] = useState<TripFormData | null>(null);
  const [loading, setLoading] = useState(false);

  if (!id) {
    return <div>Trip Not found</div>;
  }

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const foundTrip = await getTripById(tripId || "");
        console.log(`Found Trip : ${JSON.stringify(foundTrip)}`);
        if (foundTrip) {
          setTrip(foundTrip);
        } else {
          toast.error("Trip not found");
          router.push("/dashboard");
        }
      } catch {
        toast.error("Failed to fetch trip");
      }
    };

    fetchTrip();
  }, [id]);

  const handleSubmit = async (data: TripFormData) => {
    setLoading(true);
    try {
      if (tripId) {
        await editTrip(tripId, data);
        toast.success("Trip updated successfully ✅");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Failed to update trip ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <TripForm onSubmit={handleSubmit} initialData={trip} loading={loading} />
  );
}
