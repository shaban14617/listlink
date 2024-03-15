import { useFormStatus } from "react-dom";

function SubmitButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-blue-500 disabled:bg-blue-300 disabled:text-white text-white py-2 px-4 flex mx-auto w-full items-center gap-2 justify-center"
    >
      {pending ? <span>Saving...</span> : children}
    </button>
  );
}

export default SubmitButton;
