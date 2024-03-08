"use client";

import {
  faChartLine,
  faFileLines,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";
import { usePathname } from "next/navigation";

// const nonActive = "flex  items-center gap-2 text-gray-500";
// const active = "bg-blue-700 text-white rounded-md";

function AppSidebar() {
  const path = usePathname();

  return (
    <nav className=" inline-flex flex-col text-center mt-12 gap-6 text-gray-500">
      <Link
        href={"/account"}
        className={
          "flex  items-center rounded-md gap-2 p-2 " +
          (path === "/account" ? "text-blue-500" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className="w-6 h-6"
        />
        <span className="">my page</span>
      </Link>
      <Link
        href={"/analytics"}
        className={
          "flex  items-center rounded-md gap-2 p-2 " +
          (path === "/analytics" ? "text-blue-500" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className="w-6 h-6"
        />

        <span className="">Analytics</span>
      </Link>
      <LogoutButton
        leftIcon={true}
        className={"flex gap-2 items-center p-2"}
        iconClasses={"w-6 h-6"}
      />

      <Link href={"/"} className="mt-96 rounded-md gap-2 border-t p-1">
        <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
        <span>Home</span>
      </Link>
    </nav>
  );
}

export default AppSidebar;
