import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

async function Analyticspage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user.email });

  mongoose.connect(process.env.MONGODB_URI);
  const viewsCount = await Event.countDocuments({
    type: "view",
    uri: page.uri,
  });
  const clickCount = await Event.countDocuments({
    type: "click",
    uri: page.links.map((l) => l.url),
  });
  return (
    <div>
      <SectionBox>{clickCount}</SectionBox>
    </div>
  );
}

export default Analyticspage;
