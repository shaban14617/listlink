import toast from "react-hot-toast";

export default async function upload(ev, callbackFn) {
  const uploadPromise = new Promise((resolve, reject) => {
    const file = ev.target.files?.[0];

    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          response.json().then((link) => {
            callbackFn(link);
            resolve(link);
          });
        } else {
          reject();
        }
      });
    }
  });
  await toast.promise(uploadPromise, {
    loading: "Uploading...",
    success: "Uploaded successfully!",
    error: "Upload Error!",
  });
}
