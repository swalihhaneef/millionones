import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    status: { type: Number, default: 0 },
    type: { type: [String], enum: ["works", "service"] },
    name: { type: String, required: true },
    image: { type: String, required: true },
    desc: String,
    order: Number,
  },
  {
    timestamps: true,
  }
);

export default model("category", schema);
