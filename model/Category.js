import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    status: { type: Number, default: 0 },
    name: String,
    order: Number,
  },
  {
    timestamps: true,
  }
);

export const Category = model("category", schema);
