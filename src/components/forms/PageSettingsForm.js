"use client";
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/RadioTogglers";

import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PageSettingsForm({ page, user }) {
  function saveBaseSettings(formData) {
    console.log(formData.get("displayName"));
  }

  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div className="bg-gray-300 py-16 flex justify-center items-center">
          <RadioTogglers
            options={[
              { value: "color", icon: faPalette, label: "Color" },
              { value: "image", icon: faImage, label: "Image" },
            ]}
            onChange={() => {}}
          />
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
