import mongoose, { Schema, Document } from "mongoose";

export interface TripPlan extends Document {
  title: string;
  destination: string;
  days: number;
  budget: number;
  createdAt: Date;
}

const tripSchema: Schema = new Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  budget: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<TripPlan>("Trip", tripSchema);
