"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import upload from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);
  async function save() {
    await savePageLinks(links);
    toast.success("Links Saved!");
  }
  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }
  function handleUpload(ev, linkKey) {
    upload(ev, (uploadedLink) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKey) {
            link.icon = uploadedLink;
          }
        });
        return newLinks;
      });
    });
  }
  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link, index) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return newLinks;
    });
  }
  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) => {
      return [...prevLinks].filter((l) => l.key !== linkKeyToRemove);
    });
    toast.success("Link has been removed");
  }
  return (
    <SectionBox>
      <form action={save} className="">
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          className="text-lg flex gap-2 items-center text-blue-500"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="aspect-square bg-blue-500 rounded-full text-white p-1"
          />
          <span>Add link</span>
        </button>
        <div className="">
          <ReactSortable handle=".handle" list={links} setList={setLinks}>
            {links.map((l) => {
              return (
                <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                  <div className="cursor-grab handle">
                    <FontAwesomeIcon
                      className="text-gray-500 mr-2 cursor-grabbing"
                      icon={faGripLines}
                    />
                  </div>
                  <div>
                    <div className="text-center">
                      <div className="bg-gray-300 inline-flex  relative aspect-square overflow-hidden w-16 h-16  justify-center rounded-full items-center">
                        {l.icon && (
                          <Image
                            className="object-cover w-full h-full"
                            src={l.icon}
                            width={64}
                            height={64}
                            alt="icon"
                          />
                        )}
                        {!l.icon && <FontAwesomeIcon size="xl" icon={faLink} />}
                      </div>
                      <div className="cursor-pointer">
                        <input
                          onChange={(ev) => handleUpload(ev, l.key)}
                          className="hidden"
                          id={"icon" + l.key}
                          type="file"
                        />
                        <label
                          htmlFor={"icon" + l.key}
                          className="border text-gray-700 mt-2 p-2 mb-2 gap-2 flex items-center cursor-pointer justify-center"
                        >
                          <FontAwesomeIcon icon={faCloudArrowUp} />
                          <span>Change icon</span>
                        </label>
                        <button
                          onClick={() => removeLink(l.key)}
                          type="button"
                          className="block w-full mb-2 items-center gap-1 bg-gray-300 py-2 px-3 mx-auto"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span>Remove link</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grow">
                    <label className="input-label" style={{ fontSize: "15px" }}>
                      Title:
                    </label>
                    <input
                      value={l.title}
                      onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                      type="text"
                      placeholder="title"
                    />
                    <label className="input-label" style={{ fontSize: "15px" }}>
                      Subtitle:
                    </label>
                    <input
                      value={l.subtitle}
                      onChange={(ev) => handleLinkChange(l.key, "subtitle", ev)}
                      type="text"
                      placeholder="subtitle (optional)"
                    />
                    <label className="input-label" style={{ fontSize: "15px" }}>
                      URL:
                    </label>
                    <input
                      value={l.url}
                      onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                      type="text"
                      placeholder="url"
                    />
                  </div>
                </div>
              );
            })}
          </ReactSortable>
        </div>
        <div className="border-t mt-4 pt-4">
          <SubmitButton className={"max-w-xs mx-auto"}>
            <FontAwesomeIcon icon={faSave} />
            <span>save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}

export default PageLinksForm;
