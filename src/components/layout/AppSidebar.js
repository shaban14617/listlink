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

// const nonActive = "flex  items-center gap-4 text-gray-500";
// const active = "bg-blue-700 text-white rounded-md";

function AppSidebar() {
  const path = usePathname();

  return (
    <nav className="inline-flex flex-col text-center mt-12 gap-6 text-gray-500">
      <Link
        href={"/account"}
        className={
          "flex  items-center gap-4 " +
          (path === "/account" ? "text-blue-500 font-bold" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className="w-[20px] h-[24px]"
        />
        <span className="">my page</span>
      </Link>
      <Link
        href={"/analytics"}
        className={
          "flex  items-center gap-4 " +
          (path === "/analytics" ? "text-blue-500 font-bold" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className="w-[20px] h-[24px]"
        />

        <span className="">Analytics</span>
      </Link>
      <LogoutButton
        leftIcon={true}
        iconClasses={"w-[20px] h-[24px]"}
        className={"flex gap-4 items-center"}
      />

      <Link href={"/"} className="mt-96 flex  items-center gap-4 border-t p-1">
        <FontAwesomeIcon icon={faHome} className="w-[20px] h-[24px]" />
        <span>Home</span>
      </Link>
    </nav>
  );
}

export default AppSidebar;
