import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";

function LoginPage() {
  return (
    <div>
      <div className="bg-white border p-4 max-w-xs mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Sign In</h1>
        <p className="text-center mb-6 ">sign in to your account using...</p>
        <LoginWithGoogle />
      </div>
    </div>
  );
}

export default LoginPage;
