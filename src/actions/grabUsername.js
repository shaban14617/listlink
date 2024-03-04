export default async function grapUsername(formData) {
  "use server";

  console.log(formData.get("username"));
}
