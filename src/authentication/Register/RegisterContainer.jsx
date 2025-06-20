import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileCreation from "./ProfileCreation";
import Register from "./Register";

export default function RegisterContainer({
  onRegister,
  isLoading,
  error,
  onSignWithGoogle,
}) {
  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    role: "user",
    email: "",
    password: "",
  });
  const [profileData, setProfileData] = useState({
    avatar: null,
    preview: "",
    phone: "",
    date: "YYYY-MM-DD",
    city: "",
    street: "",
    flat: "",
    termsAccepted: false,
  });
  // const [error, setError] = useState("");

  const handleSignUpSubmit = () => {
    setStep(2);
  };

  const handleProfileCreationSubmit = (isCompleted) => {
    if (isCompleted) {
      const updatedData = {
        ...registerData,
        ...profileData,
      };
      onRegister(updatedData, true);
    } else {
      const profileReset = {
        avatar: null,
        preview: "",
        phone: "",
        date: "YYYY-MM-DD",
        city: "",
        street: "",
        flat: "",
        termsAccepted: false,
      };
      const updatedData = {
        ...registerData,
        ...profileReset,
      };
      onRegister(updatedData, false);
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <Register
            userData={registerData}
            setUserData={setRegisterData}
            onSubmit={handleSignUpSubmit}
            error={error}
            onSignWithGoogle={onSignWithGoogle}
          />
        );
      case 2:
        return (
          <ProfileCreation
            userData={profileData}
            setUserData={setProfileData}
            onSubmit={handleProfileCreationSubmit}
            onBack={() => setStep(1)}
            isLoading={isLoading}
            error={error}
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
          <Link to="/">SmartCart</Link>
        </h1>
      </header>

      <main className="flex-grow flex flex-col md:flex-row items-center mt-10 md:mt-0 p-2 lg:p-6 gap-10">
        {/* <div className="flex flex-col md:flex-row rounded-lg overflow-hidden"> */}
        {/* Left Side - Illustration */}
        <div className="w-full hidden md:block max-h-[400px] rounded-md ">
          <div className="p-4 bg-blue-50  w-full lg:w-11/12 mx-auto rounded-md">
            <img
              src="register.webp"
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
