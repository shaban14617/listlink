"use client";
import {
  faCloudArrowDown,
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/RadioTogglers";

import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";

function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user.image);
  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved!");
    }
  }
  async function upload(ev, callbackFn) {
    const uploadPromise = new Promise((resolve, reject) => {
      const file = ev.target.files?.[0];

      if (file) {
        const data = new FormData();
        data.set("file", file);
        fetch("api/upload", {
          method: "POST",
          body: data,
        }).then((response) => {
          if (response.ok) {
            response.json().then((link) => {
              callbackFn(link);
              resolve(link);
            });
          } else {
            reject();
          }
        });
      }
    });
    await toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "Uploaded successfully!",
      error: "Upload Error!",
    });
  }
  async function handleCoverImageChange(ev) {
    await upload(ev, (link) => {
      setBgImage(link);
    });
  }
  async function handleAvatarImageChange(ev) {
    await upload(ev, (link) => {
      setAvatar(link);
    });
  }

  return (
    <div>
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
            className="py-4 flex justify-center items-center bg-cover bg-center min-h-[250px]"
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
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden"
                    />
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FontAwesomeIcon
                        icon={faUpload}
                        className="text-gray-700"
                      />
                      <span>Change image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center -mb-12 ">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                <Image
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt={"userPhoto"}
                  width={128}
                  height={128}
                />
              </div>
              <label
                htmlFor="avatarIn"
                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
              >
                <FontAwesomeIcon size="lg" icon={faCloudArrowUp} />
              </label>
              <input
                onChange={handleAvatarImageChange}
                id="avatarIn"
                type="file"
                className="hidden"
              />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>
          <div className="p-0">
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
      </SectionBox>
    </div>
  );
}

export default PageSettingsForm;
