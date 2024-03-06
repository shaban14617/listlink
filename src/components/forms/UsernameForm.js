"use client";
import grabUsername from "@/actions/grabUsername";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { redirect } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";

function UsernameForm({ desiredUsername }) {
  const [taken, setTaken] = useState(false);
  async function handleSubmit(formData) {
    const result = await grabUsername(formData);
    console.log(formData);
    console.log(result);
    setTaken(result === false);
    if (result) {
      redirect("/account?created=" + formData.get("username"));
    }
  }

  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Insert your username
      </h1>
      <p className="text-center mb-6 ">
        Choose your username that will show to the users
      </p>
      <div className="mx-auto max-w-xs">
        <input
          name="username"
          className="text-center block p-2 px mx-auto border w-full mb-2"
          type="text"
          defaultValue={desiredUsername}
          placeholder={"username"}
        />
        {taken && (
          <div className="text-center bg-red-200 border border-red-800 p-3 mb-2">
            username already taken
          </div>
        )}
        <SubmitButton>
          <span>Claim you username</span>
        </SubmitButton>
      </div>
    </form>
  );
}

export default UsernameForm;
