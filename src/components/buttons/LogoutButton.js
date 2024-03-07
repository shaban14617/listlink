"use client";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

function LogoutButton({
  className = "flex gap-2 border shadow p-2 px-3 items-center rounded-sm",
  iconClasses = "",
  leftIcon = false,
}) {
  return (
    <button onClick={() => signOut()} className={className}>
      {leftIcon && (
        <>
          <FontAwesomeIcon className={iconClasses} icon={faRightFromBracket} />
          <span>Logout</span>{" "}
        </>
      )}

      {!leftIcon && (
        <>
          <span>Logout</span>
          <FontAwesomeIcon className={iconClasses} icon={faRightFromBracket} />
        </>
      )}
    </button>
  );
}

export default LogoutButton;
