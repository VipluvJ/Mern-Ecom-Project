import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
    unique: true,
  },

  slug: {
    type: "string",
    lowercase: true,
  },
  deleted: {
    type: "boolean",
    default: false,
  },
});

export default mongoose.model("category", categorySchema);
