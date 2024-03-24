"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faEnvelope,
  faGripLines,
  faMobile,
  faPlus,
  faSave,
  faTrash,
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
import PageSettingsForm from "./PageSettingsForm";
import { ReactSortable } from "react-sortablejs";

export const allButtons = [
  {
    key: "email",
    label: "email",
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

function PageButtonForm({ user, page }) {
  const pageSavedButtonsKeys = Object.keys(page.buttons);
  const pageSavedButtonsInfo = pageSavedButtonsKeys.map((k) =>
    allButtons.find((b) => b.key === k)
  );
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);
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
  function removeButton({ key: keyToRemove }) {
    setActiveButtons((prevButtons) => {
      return prevButtons.filter((button) => button.key !== keyToRemove);
    });
  }
  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => {
            return (
              <div className=" mb-4 md:flex items-center" key={b.label}>
                <div className=" w-56 flex p-2 gap-2 items-center text-gray-700">
                  <FontAwesomeIcon
                    icon={faGripLines}
                    className="handle cursor-grab text-gray-400 pr-2"
                  />
                  <FontAwesomeIcon icon={b.icon} />
                  <span>{upperFirst(b.label)}:</span>
                </div>
                <div className="grow flex">
                  <input
                    type="text"
                    name={b.key}
                    style={{ marginBottom: "0" }}
                    placeholder={b.placeholder}
                    defaultValue={page.buttons[b.key]}
                  />
                  <button
                    onClick={() => removeButton(b)}
                    type="button"
                    className="py-2 px-4 bg-gray-300 hover:text-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} className="" />
                  </button>
                </div>
              </div>
            );
          })}
        </ReactSortable>
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
