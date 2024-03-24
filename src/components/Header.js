import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.name;
  return (
    <header className="bg-white border-b  py-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-2 text-blue-500 ">
            <FontAwesomeIcon className="h-4 " icon={faLink} />
            <span className="font-bold">Linklist</span>
          </Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>
        <nav className="flex items-center gap-4 text-sm text-slate-500">
          {!!session && (
            <>
              <Link href={"/account"}>Hello, {user.split(" ")[0]}</Link>
              <LogoutButton />
            </>
          )}
          {!session && (
            <>
              <Link href={"/login"}>Sign in</Link>
              <Link href={"/login"}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
