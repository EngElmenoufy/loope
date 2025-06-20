import { useState } from "react";
import EmailForm from "./EmailForm";
import VerificationForm from "./VerificationForm";
import ResetPasswordForm from "./ResetPasswordForm";
import SuccessMessage from "./SuccessMessage";
import { Link } from "react-router-dom";

export default function ForgotPasswordContainer({ onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = (submittedEmail) => {
    setEmail(submittedEmail);

    setStep(2);
  };

  const handleVerificationSubmit = (code) => {
    setVerificationCode(code);

    setStep(3);
  };

  const handlePasswordSubmit = () => {
    setStep(4);

    // setTimeout(() => {
    //   onClose && onClose();
    // }, 3000);
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailForm
            onSubmit={handleEmailSubmit}
            error={error}
            setError={setError}
          />
        );
      case 2:
        return (
          <VerificationForm
            onSubmit={handleVerificationSubmit}
            onBack={() => setStep(1)}
            email={email}
            error={error}
            setError={setError}
          />
        );
      case 3:
        return (
          <ResetPasswordForm
            onSubmit={handlePasswordSubmit}
            onBack={() => setStep(2)}
            error={error}
            setError={setError}
            email={email}
            code={verificationCode}
          />
        );
      case 4:
        return <SuccessMessage />;
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

      {/* Main content */}
      <main className="flex-grow flex flex-col md:flex-row items-center mt-10 md:mt-0 p-2 md:p-6 gap-10">
        {/* Logo Section */}
        <div className="w-full hidden md:block max-h-[400px]">
          <div className="p-4 w-full lg:w-11/12 mx-auto overflow-hidden">
            <img
              src="restore_pass.avif"
              alt="cart image"
              className=" w-full max-h-[380px] object-contain object-center rounded-md"
            />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:p-6">
          {step !== 4 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Reset Your Password</h2>
              <p className="text-gray-600 mb-4">
                {step === 1 &&
                  "Enter your email to receive a verification code"}
                {step === 2 && "Enter the verification code sent to your email"}
                {step === 3 && "Create a new password for your account"}
                {step === 4 && "Password reset successful"}
              </p>
            </>
          )}
          {renderCurrentStep()}
        </div>
      </main>
    </div>
  );
}
