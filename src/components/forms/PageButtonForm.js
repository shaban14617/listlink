"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faEnvelope,
  faMobile,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";
const allButtons = [
  {
    key: "e-mail",
    label: "e-mail",
    icon: faEnvelope,
    placeholder: "example@gmail.com",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: faMobile,
    placeholder: "+20 123 123 123",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "https://www.instagram.com/profile",
  },
  {
    key: "facebook",
    label: "facebook",
    icon: faFacebook,
  },
  {
    key: "discord",
    label: "discord",
    icon: faDiscord,
  },
  {
    key: "tiktok",
    label: "tiktok",
    icon: faTiktok,
  },
  {
    key: "youtube",
    label: "youtube",
    icon: faYoutube,
  },
  {
    key: "whatsapp",
    label: "whatsapp",
    icon: faWhatsapp,
  },
  {
    key: "github",
    label: "github",
    icon: faGithub,
  },
];

function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function PageButtonForm() {
  const [activeButtons, setActiveButtons] = useState([]);
  const availableButtons = allButtons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );
  function addButtonToProfile(button) {
    setActiveButtons((prev) => {
      return [...prev, button];
    });
  }
  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success("Settings Saved!");
  }
  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        {activeButtons.map((b) => {
          return (
            <div className="mb-4 flex items-center" key={b.label}>
              <div className="w-36 flex p-2 gap-2 items-center text-gray-700">
                <FontAwesomeIcon icon={b.icon} />
                <span>{upperFirst(b.label)}:</span>
              </div>
              <input
                type="text"
                name={b.key}
                style={{ marginBottom: "0" }}
                placeholder={b.placeholder}
              />
            </div>
          );
        })}
        <div className="flex flex-wrap gap-2 mt-8 py-4 border-y">
          {availableButtons.map((b) => (
            <button
              type="button"
              key={b.key}
              onClick={() => addButtonToProfile(b)}
              className="flex gap-1 p-2 bg-gray-200 items-center"
            >
              <FontAwesomeIcon icon={b.icon} />
              <span className="">{upperFirst(b.label)}</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
export default PageButtonForm;
