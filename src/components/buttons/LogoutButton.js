import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

function LogoutButton() {
  function handleSignout() {
    signOut();
  }
  return (
    <button
      className="flex items-center gap-2 border p-2 px-4 shadow"
      onClick={handleSignout()}
    >
      <span>Logout</span>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
}

export default LogoutButton;
