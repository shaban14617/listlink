import { Event } from "@/models/Event";

export async function POST() {
  await Event.create({ type: "click", uri: "" });
  return Response.json(true);
}
