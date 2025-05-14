import { useState } from "react";
import ButtonWithLoading from "../../components/ButtonWithLoading/ButtonWithLoading";

function AccountEmail({
  user,
  onSubmit,
  formError,
  successMessage,
  isLoading,
}) {
  const [userData, setUserData] = useState({
    ...user,
  });
  const [newEmail, setNewEmail] = useState("");
  const [errorNewEmail, setErrorNewEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(newEmail)) {
      setErrorNewEmail("Please enter vaild email");
      return;
    }

    onSubmit(userData, "email");

    // try {
    //   await onSubmit(email);
    // } catch (err) {
    //   // Error is handled in the parent component
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleNewEmailChange = (e) => {
    const { name, value } = e.target;
    setErrorNewEmail("");

    setNewEmail(value);

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Email</h2>
      <div className="space-y-1 pb-4 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-800">Current email</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {formError && (
          <div className="mb-4 bg-red-50 p-2 rounded border border-red-200">
            <p className="text-sm text-red-600">{formError}</p>
          </div>
        )}
        {successMessage && (
          <div className="mb-4 bg-green-50 p-2 rounded border border-green-200">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        <div className={`mb-1 ${!errorNewEmail ? "pb-5" : ""}`}>
          <label
            htmlFor="email"
            className="block text-base font-semibold text-gray-800"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={newEmail}
            onChange={handleNewEmailChange}
            className={`mt-1 ${errorNewEmail ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter your email"
          />
          {errorNewEmail && (
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorNewEmail}
            </p>
          )}
        </div>

        {/* <div className={`mb-1 ${!errorYourPassword ? "pb-5" : ""}`}>
          <label
            htmlFor="yourPassword"
            className="block text-base font-semibold text-gray-800"
          >
            Your Password
          </label>
          <div className="relative">
            <input
              id="yourPassword"
              type={showYourPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="mt-1 tracking-wide block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              value={yourPassword}
              onChange={(e) => handleYourPasswordChange(e.target.value)}
              onBlur={handleYourPasswordBlur}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleYourPasswordVisibility}
              aria-label={showYourPassword ? "Hide password" : "Show password"}
            >
              {showYourPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#18403c"
                >
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#18403c"
                >
                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                </svg>
              )}
            </button>
          </div>
          {errorYourPassword && (
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorYourPassword}
            </p>
          )}
        </div> */}

        <ButtonWithLoading
          buttonName={"Change Email"}
          isLoading={isLoading}
          otherClass={"w-[125px]"}
        />
      </form>
    </div>
  );
}

export default AccountEmail;
