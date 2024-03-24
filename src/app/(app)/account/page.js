import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonForm from "@/components/forms/PageButtonForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import cloneDeep from "clone-deep";

async function AccountPage({ searchParams, ...rest }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    redirect("/");
  }
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session?.user?.email });

  const leanPage = cloneDeep(page.toJSON());
  leanPage._id = leanPage._id.toString();

  if (page) {
    return (
      <>
        <PageSettingsForm page={leanPage} user={session.user} />
        <PageButtonForm page={leanPage} user={session.user} />
        <PageLinksForm page={leanPage} user={session.user} />
      </>
    );
  }

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}

export default AccountPage;
