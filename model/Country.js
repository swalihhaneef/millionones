import { Schema, model } from "mongoose";

let schema = new Schema(
  {
    id: {
      type: Number,
    },
    status: { type: Number, default: 0 },
    name: {
      type: String,
    },
    phonecode: {
      type: Number,
    },
    sortname: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "countries",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export default model("Countries", schema);
