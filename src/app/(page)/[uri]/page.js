import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import Image from "next/image";

async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });
  console.log(user);
  return (
    <div className="bg-blue-900">
      <div
        className="h-36 bg-gray-300 bg-cover bg-center "
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -m-16">
        <Image
          className=" rounded-full w-full h-full object-cover"
          src={user.image}
          alt="avatar"
          width={265}
          height={265}
        />
      </div>
      <h2>{page.displayName}</h2>
      <h3>{page.location}</h3>
      <h3>{page.bio}</h3>
    </div>
  );
}

export default UserPage;
