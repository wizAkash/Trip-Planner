"use client";

import { useEffect, useState } from "react";
import { Button, Box, TextField, Paper } from "@mui/material";
import TripCard from "../components/TripCard";
import { toast } from "react-toastify";
import { getTrips } from "@/api/tripApi";
import { useRouter } from "next/navigation";
import { Trip } from "@/libs/interfaces";
import Pagination from "@mui/material/Pagination";

export default function DashBoard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTrips, setTotalTrips] = useState(0);
  const router = useRouter();
  const [searchDestination, setSearchDestination] = useState("");
  const [maxBudget, setMaxBudget] = useState<number | "">("");
  const limit = 9;

  useEffect(() => {
    fetchTrips(currentPage);
  }, [currentPage, searchDestination, maxBudget]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchDestination, maxBudget]);

  const fetchTrips = async (page = 1) => {
    try {
      const offset = (page - 1) * limit;
      const data = await getTrips(
        limit,
        offset,
        searchDestination,
        maxBudget === "" ? undefined : maxBudget
      );
      setTrips(data.trips);
      setTotalTrips(data.total);
    } catch (error) {
      toast.error("Failed to fetch trips");
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        <Button variant="contained" onClick={() => router.push("/submit")}>
          Add Trip
        </Button>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Filter by Destination"
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
            size="small"
          />
          <TextField
            label="Max Budget"
            type="number"
            value={maxBudget}
            onChange={(e) =>
              setMaxBudget(e.target.value ? Number(e.target.value) : "")
            }
            size="small"
            sx={{ width: 120 }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              setSearchDestination("");
              setMaxBudget("");
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>

      <Pagination
        count={Math.ceil(totalTrips / limit)}
        page={currentPage}
        onChange={(_event, page) => setCurrentPage(page)}
        color="primary"
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          "& > div": {
            flex: "1 1 100%",
            maxWidth: "100%",
            "@media (min-width: 600px)": {
              flex: "1 1 calc(50% - 16px)",
              maxWidth: "calc(50% - 16px)",
            },
            "@media (min-width: 900px)": {
              flex: "1 1 calc(33.33% - 16px)",
              maxWidth: "calc(33.33% - 16px)",
            },
          },
        }}
      >
        {trips?.map &&
          trips.map((trip) => (
            <div key={trip._id}>
              <TripCard
                trip={trip}
                onEdit={() => router.push(`/edit/${trip._id}`)}
              />
            </div>
          ))}
      </Box>
    </div>
  );
}
