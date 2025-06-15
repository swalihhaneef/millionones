import { model, Schema } from "mongoose";
import { currentDate, currentTime } from "../helper/functions";

const schema = new Schema(
  {
    ip: String,
    name: String,
    designation: String,
    image: String,
    url: String,
    testimonial: String,
    addedBy: { type: Schema.Types.ObjectId, ref: "user" },
    updateBy: { type: Schema.Types.ObjectId, ref: "user" },
    date: { type: String, default: currentDate() },
    time: { type: String, default: currentTime() },
    upDate: String,
    upTime: String,
  },
  {
    timestamps:true
  }
);
export default model("testimonial",schema)