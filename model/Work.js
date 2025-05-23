import { model, Schema } from "mongoose";
import { currentDate, currentTime } from "../helper/functions.js";

const schema = new Schema(
  {
    title: { type: String, required: true },
    heading: { type: String, required: true },
    status: { type: Number, default: 0 },
    client: { type: String, required: true },
    service: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: "category" },
    img: { type: String, required: true },
    details: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        img: String,
      },
    ],
    conclusion: String,
    slug: { type: String, required: true },
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

export const Work = model("works", schema);
