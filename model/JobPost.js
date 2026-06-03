import { model, Schema } from "mongoose";
import { currentDate, currentTime } from "../helper/functions.js";

const schema = new Schema(
  {
    status: { type: Number, default: 0 },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Contract"], default: "Full-time" },
    requirements: [{ type: String, required: true }],
    slug: String,
    uniqueId: String,
    addedBy: { type: Schema.Types.ObjectId, ref: "user" },
    updateBy: { type: Schema.Types.ObjectId, ref: "user" },
    date: { type: String, default: currentDate() },
    time: { type: String, default: currentTime() },
    upDate: String,
    upTime: String,
  },
  {
    timestamps: true,
  }
);

export default model("jobPost", schema);
