import { model, Schema } from "mongoose";

import { currentDate, currentTime } from "../helper/functions.js";

const schema = new Schema(
  {
    ip: String,
    status: { type: Number, default: 0 },
    name: String,
    desc: String,
    content: String,
    slug: { type: String },
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

export default model("industries", schema);
