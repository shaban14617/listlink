import { allButtons, buttonIcons } from "@/components/forms/PageButtonForm";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faEnvelopeCircleCheck,
  faLink,
  faLocationDot,
  faMobile,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

async function UserPage({ params }) {
  const buttonIcons = {
    email: faEnvelope,
    mobile: faPhone,
    instagram: faInstagram,
    facebook: faFacebook,
    discord: faDiscord,
    tiktok: faTiktok,
    youtube: faYoutube,
    whatsapp: faWhatsapp,
    github: faGithub,
  };
  const uri = params.uri;
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });

  await Event.create({ uri: uri, page: page.uri, type: "view" });

  function buttonLink(key, value) {
    if (key === "mobile") {
      return "+20" + value;
    }
    if (key === "email") {
      return "mailto:" + value;
    }
    return value;
  }

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div
        className="h-36 bg-gray-300 bg-cover bg-center "
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -m-12">
        <Image
          className=" rounded-full w-full h-full object-cover"
          src={user.image}
          alt="avatar"
          width={265}
          height={265}
        />
      </div>
      <div className="mt-16">
        <h2 className="text-xl text-center">{page.displayName}</h2>
        <h3 className="text-md gap-2 flex items-center justify-center text-white/70 ">
          <FontAwesomeIcon className="h-4 " icon={faLocationDot} />
          <span>{page.location}</span>
        </h3>
      </div>
      <div className="max-w-xs mx-auto text-center my-3">
        <p>{page.bio}</p>
      </div>
      <div className="flex gap-2 justify-center pb-4 mt-6">
        {Object.keys(page.buttons).map((buttonKey) => (
          <Link
            target="_blank"
            className="rounded-full border bg-white text-blue-900 border-white p-2 flex items-center justify-center "
            key={page.buttons[buttonKey]}
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
          >
            <FontAwesomeIcon
              className="w-5 h-5"
              icon={buttonIcons[buttonKey]}
            />
          </Link>
        ))}
      </div>
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4">
        {page.links.map((link) => (
          <Link
            ping={
              process.env.URL +
              "api/click?url=" +
              btoa(link.url) +
              "&page=" +
              page.uri
            }
            href={link.url}
            target="_blank"
            className="bg-indigo-800 flex p-2"
            key={link.subtitle}
          >
            <div className="bg-blue-200 aspect-square relative -left-5 overflow-hidden h-16 w-16 flex items-center justify-center">
              {link.icon && (
                <Image src={link.icon} alt="icon" width={64} height={64} />
              )}
              {!link.icon && (
                <FontAwesomeIcon icon={faLink} className="h-8 w-8" />
              )}
            </div>
            <div className="flex items-center">
              <div>
                <h3>{link.title}</h3>
                <p className="text-white/50 h-6 overflow-hidden ">
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
