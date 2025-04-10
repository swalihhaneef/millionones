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
    category: { type: Schema.Types.ObjectId, ref: "blogCategory" },
    image: String,
    addedBy: { type: Schema.Types.ObjectId, ref: "user" },
    updateBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

export const Blog = model("blog", schema);
