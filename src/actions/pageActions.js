import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveBaseSettings() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    Page.updateOne({});
  }
}
