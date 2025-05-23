import { model, Schema, Types } from "mongoose";
import { currentDate, currentTime } from "../helper/functions.js";

const SubContentSchema = new Schema({
  title: String,
  content: String,
});

const Section2Schema = new Schema({
  title: String,
  image: String,
  content: String,
});

const schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  status: { type: Number, default: 0 },
  sec1: {
    title: String,
    content: String,
  },
  sec2: [Section2Schema],
  sec3: {
    title: String,
    content: String,
  },
  sec4: {
    title: String,
    contents: [SubContentSchema],
  },
  sec5: {
    title: String,
    content: [SubContentSchema],
  },
  sec6: {
    title: String,
    content: String,
  },
  faq: [
    {
      question: String,
      answer: String,
    },
  ],
  category: { type: Types.ObjectId, required: true, ref: "category" },
  addedBy: { type: Schema.Types.ObjectId, ref: "user" },
  updateBy: { type: Schema.Types.ObjectId, ref: "user" },
  date: { type: String, default: currentDate() },
  time: { type: String, default: currentTime() },
  upDate: String,
  upTime: String,
});

export const Service = model("service", schema);
