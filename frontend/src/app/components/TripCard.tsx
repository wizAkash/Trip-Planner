"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

export interface TripCardProps {
  trip: {
    _id?: string; // will be used later for editing
    title: string;
    destination: string;
    days: number;
    budget: number;
    createdAt: Date;
  };
  onEdit?: (id: string) => void;
}

export default function TripCard({ trip, onEdit }: TripCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{trip.title}</Typography>
        <Typography>Destination: {trip.destination}</Typography>
        <Typography>Days: {trip.days}</Typography>
        <Typography>Budget: ${trip.budget}</Typography>
        <Typography>
          Trip published on: {new Date(trip.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      {onEdit && (
        <CardActions>
          <Button size="small" onClick={() => trip._id && onEdit(trip._id)}>
            Edit
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
