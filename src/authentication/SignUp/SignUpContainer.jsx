import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCreation from "./ProfileCreation";
import SignUp from "./SignUp";

function SignUpContainer() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUpSubmit = async (submittedData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...submittedData,
    }));
    setStep(2);
    // try {
    //   // API call to send verification code
    //   // await fetch('/api/forgot-password', {
    //   //   method: 'POST',
    //   //   headers: { 'Content-Type': 'application/json' },
    //   //   body: JSON.stringify({ email: submittedEmail })
    //   // });

    //   // Move to next step
    // } catch (err) {
    //   setError("Failed to send verification code. Please try again.");
    // }
  };

  const handleProfileCreationSubmit = async (submittedData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...submittedData,
    }));
    navigate("/");
    // try {
    //   // API call to send verification code
    //   // await fetch('/api/forgot-password', {
    //   //   method: 'POST',
    //   //   headers: { 'Content-Type': 'application/json' },
    //   //   body: JSON.stringify({ email: submittedEmail })
    //   // });

    //   // Move to next step
    // } catch (err) {
    //   setError("Failed to send verification code. Please try again.");
    // }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <SignUp
            onSubmit={handleSignUpSubmit}
            error={error}
            setError={setError}
          />
        );
      case 2:
        return (
          <ProfileCreation
            onSubmit={handleProfileCreationSubmit}
            onBack={() => setStep(1)}
            error={error}
            setError={setError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#18403C] py-4 px-6 text-white text-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Loope</Link>
        </h1>
      </header>

      <main className="flex-grow flex flex-col md:flex-row items-center mt-10 md:mt-0 p-2 lg:p-6 gap-10">
        {/* <div className="flex flex-col md:flex-row rounded-lg overflow-hidden"> */}
        {/* Left Side - Illustration */}
        <div className="w-full hidden md:block max-h-[400px] rounded-md ">
          <div className="p-4 bg-blue-50  w-full lg:w-11/12 mx-auto rounded-md">
            <img
              src="signup.webp"
              alt="Shopping illustration with cart, bags, and gifts"
              className="max-h-full object-contain"
            />
          </div>
        </div>

        <div className="w-full lg:p-6">
          <h2 className="text-2xl font-bold mb-2">
            {step === 1 && "Create an account"}
            {step === 2 && "Profile Creation"}
          </h2>
          <p className="text-gray-600 mb-4">Enter your details below</p>
          {renderCurrentStep()}
        </div>
      </main>
    </div>
  );
}

export default SignUpContainer;
