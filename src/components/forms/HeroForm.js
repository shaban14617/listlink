"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function HeroForm() {
  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector("input");
    const username = input.value;
    if (username.length > 0) {
      window.localStorage.setItem("desiredUsername", username);
      await signIn("google");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex gap items-center shadow shadow-gray-700/20"
    >
      <span className="bg-white py-4 pl-4">Linklist.to/</span>
      <input type="text" placeholder="username" className="py-4" />
      <button type="submit" className="bg-blue-500 text-white py-4 px-6">
        join for free
      </button>
    </form>
  );
}

export default HeroForm;
