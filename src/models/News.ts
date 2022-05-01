import mongoose from "mongoose";
import { INews } from "../types";

const NewsSchema = new mongoose.Schema<INews>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], required: true },
  description: { type: String, required: true },
  network: { type: String, required: true }
});

export default mongoose.model("News", NewsSchema);