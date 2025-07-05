import { model, Schema } from "mongoose";
import { currentDate, currentTime } from "../helper/functions.js";

const schema = new Schema(
  {
    status: { type: Number, default: 0 },
    type: { type: [String], enum: ["works", "service"] },
    name: { type: String, required: true },
    image: { type: String, required: true },
    desc: String,
    order: Number,
    brands: [],

    addedBy: { type: Schema.Types.ObjectId, ref: "user" },
    updateBy: { type: Schema.Types.ObjectId, ref: "user" },
    date: { type: String, default: currentDate() },
    time: { type: String, default: currentTime() },
  },
  {
    timestamps: true,
  }
);

export default model("category", schema);
