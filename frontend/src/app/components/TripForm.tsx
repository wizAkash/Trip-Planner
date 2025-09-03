"use client";

import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";

interface TripFormProps {
  onSubmit: (formData: TripFormData) => void;
  initialData?: TripFormData;
  loading: boolean;
}

export interface TripFormData {
  title: string;
  destination: string;
  days: number;
  budget: number;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  destination: yup.string().required("Destination is required"),
  days: yup
    .number()
    .typeError("Days must be a number")
    .positive("Days must be positive")
    .integer("Days must be an integer")
    .required("Days are required"),
  budget: yup
    .number()
    .typeError("Budget must be a number")
    .positive("Budget must be positive")
    .required("Budget is required"),
});

export default function TripForm({
  onSubmit,
  initialData,
  loading,
}: TripFormProps) {
  const defaultValues: TripFormData = initialData || {
    title: "",
    destination: "",
    days: 0,
    budget: 0,
  };

  const { register, handleSubmit, reset, formState, control } =
    useForm<TripFormData>({
      defaultValues,
      resolver: yupResolver(schema),
    });

  // Watch all form fields
  const watchedFields = useWatch({ control });

  // Check if form is unchanged
  const isUnchanged = useMemo(() => {
    if (!initialData) return false; // For add form, always allow
    return Object.keys(defaultValues).every(
      (key) => (defaultValues as any)[key] === (watchedFields as any)[key]
    );
  }, [watchedFields, defaultValues, initialData]);

  const submitHandler = (data: TripFormData) => {
    if (isUnchanged) {
      alert("You need to change at least one field to update.");
      return;
    }
    onSubmit(data);
  };

  const onreset = () => {
    reset(defaultValues);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" mb={2} align="center">
        {initialData ? "Edit Trip" : "Add a New Trip"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          {...register("title")}
          error={!!formState.errors.title}
          helperText={formState.errors.title?.message}
        />
        <TextField
          label="Destination"
          {...register("destination")}
          error={!!formState.errors.destination}
          helperText={formState.errors.destination?.message}
        />
        <TextField
          label="Days"
          type="number"
          {...register("days")}
          error={!!formState.errors.days}
          helperText={formState.errors.days?.message}
        />
        <TextField
          label="Budget"
          type="number"
          {...register("budget")}
          error={!!formState.errors.budget}
          helperText={formState.errors.budget?.message}
        />
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button type="button" variant="outlined" onClick={onreset}>
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || isUnchanged}
          >
            {initialData ? "Update Trip" : "Add Trip"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
