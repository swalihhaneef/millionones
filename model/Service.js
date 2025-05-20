import { model, Schema } from "mongoose";

const SubContentSchema = new Schema({
  title: String,
  content: String,
});

const Section2Schema = new Schema({
  title: String,
  img: String,
  content: String,
});

const schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
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
});

export const Service = model("service", schema);
