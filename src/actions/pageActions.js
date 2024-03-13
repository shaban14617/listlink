"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData) {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const dataToUpdate = {};
  if (session) {
    const dataKey = [
      "displayName",
      "location",
      "bio",
      "bgType",
      "bgColor",
      "bgImage",
    ];
    for (const key of dataKey) {
      if (formData.has(key)) {
        dataToUpdate[key] = formData.get(key);
      }
    }

    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);
    if (formData.has("avatar")) {
      const avatarLink = formData.get("avatar");
      await User.updateOne(
        { email: session.user?.email },
        { image: avatarLink }
      );
    }
    return true;
  }
  return false;
}
