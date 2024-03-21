import { Event } from "../../../models/Event";
import mongoose from "mongoose";

export async function POST(req) {
  const url = new URL(req.url);
  const clickedLink = atob(url.searchParams.get("url"));
  console.log(clickedLink);
  mongoose.connect(process.env.MONGODB_URI);
  await Event.create({ type: "click", uri: clickedLink });
  return Response.json(true);
}
