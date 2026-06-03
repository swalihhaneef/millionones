import { model, Schema } from "mongoose";

import { currentDate, currentTime } from "../helper/functions.js";

const schema = new Schema(
  {
    ip: String,
    status: { type: Number, default: 0 },
    name: String,
    desc: String,
    content: String,
    writer: String,
    image: String,
    type: { type: String, enum: ["blog", "event", "news"] },
    readMin: Number,
    permalink: { type: String },
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

export default model("insight", schema);
//  name, desc, content,writer,image,type,readMin, permalink
