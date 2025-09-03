"use client";

import TripForm, { TripFormData } from "../components/TripForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addTrip } from "@/api/tripApi";

export default function SubmitTripPage() {
  const router = useRouter();

  const handleSubmit = async (data: TripFormData) => {
    try {
      await addTrip(data);
      toast.success("Trip added successfully ✅");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong while adding the trip ❌");
    }
  };

  return <TripForm onSubmit={handleSubmit} loading={false} />;
}
