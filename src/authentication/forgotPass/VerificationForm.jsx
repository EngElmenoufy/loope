import { useState } from "react";

const VerificationForm = ({ onSubmit, onBack, email, error, setError }) => {
  const [code, setCode] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const maskEmail = () => {
    const [username, domain] = email.split("@");
    const [domainName, tld] = domain.split(".");

    // Mask username (show first character only)
    const maskedUsername = username.charAt(0) + "*".repeat(username.length - 1);

    // Mask domain (show first character only)
    const maskedDomain =
      domainName.charAt(0) + "*".repeat(domainName.length - 1);

    return `${maskedUsername}@${maskedDomain}.${tld}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);

    try {
      await onSubmit(code);
    } catch (err) {
      // Error is handled in the parent component
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationCode = (e) => {
    setErrorCode("");
    if (e.target.value.length <= 6) {
      setCode(e.target.value);
    }
  };

  const handleVerificationCodeBlur = () => {
    if (code.length < 6) {
      setErrorCode("Please enter the right verification code (6-digit code)");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 bg-red-50 p-2 rounded border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className={`mb-1 ${!errorCode ? "pb-5" : ""}`}>
        <p className="text-sm text-gray-600 mb-4">
          We've sent a verification code to{" "}
          <span className="font-medium">{maskEmail()}</span>. Please check your
          inbox and enter the code below.
        </p>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700"
        >
          Verification Code
        </label>
        <input
          type="number"
          id="code"
          value={code}
          onChange={(e) => handleVerificationCode(e)}
          onBlur={handleVerificationCodeBlur}
          className={`mt-1 ${errorCode ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
          placeholder="Enter the 6-digit code"
        />
        {errorCode && (
          <p className="text-sm text-[#E14627] h-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="inline-block mr-2"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                fill="#E14627"
              />
            </svg>
            {errorCode}
          </p>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 px-4 border border-[#18403C] rounded-md shadow-sm text-sm font-medium text-[#18403C] bg-white hover:bg-gray-50 focus:outline-none"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#18403C] hover:bg-[#0e5b53] focus:outline-none disabled:bg-blue-300"
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </div>
    </form>
  );
};

export default VerificationForm;
