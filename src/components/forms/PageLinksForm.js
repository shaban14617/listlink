"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { faLine } from "@fortawesome/free-brands-svg-icons";
import { ReactSortable } from "react-sortablejs";
import upload from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";

function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);
  async function save() {
    await savePageLinks(links);
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
          <ReactSortable list={links} setList={setLinks}>
            {links.map((l) => {
              return (
                <div key={l.key} className="mt-8 flex gap-2 items-center">
                  <div className="cursor-grab">
                    <FontAwesomeIcon
                      className="text-gray-700 mr-2"
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
                          className="border text-gray-700 mt-2 p-2 flex item-center gap-1 rounded-md cursor-pointer"
                        >
                          <div>
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                            <span>Change icon</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="grow">
                    <input
                      value={l.title}
                      onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                      type="text"
                      placeholder="title"
                    />
                    <input
                      value={l.subtitle}
                      onChange={(ev) => handleLinkChange(l.key, "subtitle", ev)}
                      type="text"
                      placeholder="subtitle (optional)"
                    />
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
