"use client";
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/RadioTogglers";

import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";

function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved!");
    }
  }
  function handleFileChange(ev) {
    const file = ev.target.files?.[0];
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        response.json().then((link) => {
          console.log(link);
        });
      });
    }
  }

  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div
          style={{ backgroundColor: bgColor }}
          className="py-16 flex justify-center items-center"
        >
          <div>
            <RadioTogglers
              defaultValue={bgType}
              options={[
                { value: "color", icon: faPalette, label: "Color" },
                { value: "image", icon: faImage, label: "Image" },
              ]}
              onChange={(val) => setBgType(val)}
            />

            {bgType === "color" && (
              <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                <div className="flex justify-center gap-2">
                  <span>Background color:</span>
                  <input
                    onChange={(ev) => setBgColor(ev.target.value)}
                    type="color"
                    name="bgColor"
                    defaultValue={page.bgColor}
                  />
                </div>
              </div>
            )}
            {bgType === "image" && (
              <div className="flex justify-center">
                <label className="bg-white shadow px-4 py-2 mt-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  Change image
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center -mb-12">
          <Image
            className="rounded-full relative -top-6 border-4 border-white shadow shadow-black/50"
            src={user.image}
            alt={"userPhoto"}
            height={128}
            width={128}
          />
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">
            Display Name
          </label>
          <input
            name="displayName"
            defaultValue={page.displayName}
            type="text"
            id="nameIn"
            placeholder="Ahmed Shabaan"
          />
          <label className="input-label" htmlFor="locIn">
            Location
          </label>
          <input
            name="location"
            defaultValue={page.location}
            type="text"
            id="locIn"
            placeholder="Egypt"
          />
          <label className="input-label" htmlFor="bioIn">
            Bio
          </label>
          <textarea
            name="bio"
            defaultValue={page.bio}
            id="bioIn"
            placeholder="Your bio here..."
          />
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            Save
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default PageSettingsForm;
