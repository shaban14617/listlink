import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import grapUsername from "@/actions/grabUsername";

async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <form action={grapUsername}>
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
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 flex mx-auto w-full items-center gap-2 justify-center"
          >
            <span>Claim you username</span>
            <FontAwesomeIcon className="mt-[3px]" icon={faArrowRight} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountPage;
