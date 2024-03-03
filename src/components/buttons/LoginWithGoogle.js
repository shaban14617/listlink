"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";
function LoginWithGoogle() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex bg-gray-100 text-black text-center w-full rounded-md gap-3 p-4 justify-center items-center"
    >
      <FontAwesomeIcon icon={faGoogle} className="h-6" />
      Sign in with google
    </button>
  );
}

export default LoginWithGoogle;
