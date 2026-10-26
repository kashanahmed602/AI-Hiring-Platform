
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = ({
  role = "candidate",
  companyName = "",
  phone = "",
}) => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (googleResponse) => {
    try {
      if (!googleResponse.credential) {
        alert("Google did not return a credential.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/google-login`,
        {
          credential: googleResponse.credential,
          role,
          companyName,
          phone,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert(
          response.data.isNewUser
            ? "Account created successfully!"
            : "Login successful!"
        );

        navigate(
          role === "recruiter"
            ? "/recruiter/dashboard"
            : "/candidate/dashboard"
        );
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      alert(
        error.response?.data?.message ||
          "Google authentication failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => alert("Google sign-in failed.")}
        text="continue_with"
        shape="rectangular"
        theme="outline"
        width="320"
      />
    </div>
  );
};

export default GoogleAuthButton;
