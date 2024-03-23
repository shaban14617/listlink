import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import { differenceInDays, formatISO9075, isToday } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

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

  const groupedViews = await Event.aggregate(
    [
      {
        $match: {
          type: "view",
          uri: "ahmed",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$createdAt",
              format: "%Y-%m-%d",
            },
          },
          count: { $sum: 1 },
        },
      },
    ],
    { $order: "-_id" }
  );

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  return (
    <div>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <h2 className="text-xl my-6 text-center">Clicks</h2>
        {page.links.map((link) => (
          <div
            key={link.key}
            className="flex gap-6 items-center border-t border-gray-200 p-4"
          >
            <div className="text-blue-600 pl-4">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <div className="grow">
              <h3>{link.title || "no title"}</h3>
              <p className="text-sm text-gray-500">
                {link.subtitle || "no subtitle"}
              </p>
              <a
                className="text-blue-700 text-xs"
                target="_blank"
                href="link.url"
              >
                {link.url}
              </a>
            </div>
            <div>
              today:{" "}
              {
                clicks.filter((c) => c.uri === link.uri && isToday(c.createdAt))
                  .length
              }{" "}
              <br />
              all time:{clicks.filter((c) => c.uri === link.uri).length}
            </div>
          </div>
        ))}
      </SectionBox>
    </div>
  );
}

export default Analyticspage;
