"use client";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex gap-2 border shadow p-2 px-3 items-center rounded-sm"
    >
      <span>Logout</span>
      <FontAwesomeIcon className="h-4" icon={faRightFromBracket} />
    </button>
  );
}

export default LogoutButton;
