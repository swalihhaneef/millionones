import mongoose, { Schema } from "mongoose";

let schema = new Schema(
  {
    _id: Number,
    status: { type: Number, default: 0 },
    name: String,
    countryId: Number,

    id: { type: Number, required: true },
    country_id: Number,
  },
  { timestamps: true }
);

export default mongoose.model("State", schema);
