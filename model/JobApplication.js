import { model, Schema } from "mongoose";
import { currentDate, currentTime } from "../helper/functions.js";

const schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "jobPost" },
    yrsOfExp: { type: String, required: true },
    remarks: { type: String },
    uniqueId: String,
    resume: { type: String },
    country: { type: Schema.Types.Mixed, ref: "Countries" },
    state: { type: Schema.Types.Mixed, ref: "State" },
    date: { type: String, default: currentDate() },
    time: { type: String, default: currentTime() },
  },
  {
    timestamps: true,
  }
);

// schema.virtual("countryData", {
//   ref: "Countries",
//   localField: "country",
//   foreignField: "id",
//   justOne: true,
// });

export default model("jobApplication", schema);
