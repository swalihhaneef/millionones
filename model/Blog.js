import { model, Schema } from "mongoose";

import moment from "moment";

const schema = new Schema(
  {
    ip: String,
    status: { type: Number, default: 0 },
    date: {
      type: String,
      default: () => moment().format("YYYY-MM-DD"),
    },
    time: {
      type: String,
      default: () => moment().format("HH:mm:ss"),
    },
    readMin: Number,
    written: String,
    name: String,
    content: String,
    category: { type: Schema.Types.ObjectId },
    addedBy: { type: Schema.Types.ObjectId },
    updateBy: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

export const Blog = model("blog", schema);
