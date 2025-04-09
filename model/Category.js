import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    status: { type: Number, default: 0 },
    name: String,
  },
  {
    timestamps: true,
  }
);

export const BlogCategory = model("blogCategory", schema);
