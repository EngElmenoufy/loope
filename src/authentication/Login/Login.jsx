import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonWithLoading from "../../components/ButtonWithLoading/ButtonWithLoading";

export default function Login({ onLogin, isLoading, error, onSignWithGoogle }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorData, setErrorData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Please enter your email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return "";
      case "password":
        if (!value.trim()) return "Please enter your password";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (errorData[name]) {
      setErrorData((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrorData((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  useEffect(() => {
    const isValid =
      Object.values(errorData).every((error) => !error) &&
      Object.values(userData).every((field) => field.trim());
    setIsFormValid(isValid);
  }, [userData, errorData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(userData).forEach((key) => {
      newErrors[key] = validateField(key, userData[key]);
    });
    setErrorData(newErrors);

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    if (isFormValid) {
      onLogin(userData);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#18403C] py-4 px-6 text-white text-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Loope</Link>
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col md:flex-row items-center mt-10 md:mt-0 p-2 md:p-6 gap-10">
        {/* Logo Section */}
        <div className="w-full hidden md:block max-h-[400px]">
          <div className="p-4 bg-[#16988B] w-full lg:w-11/12 mx-auto rounded-md">
            <img
              src="signin.png"
              alt="cart image"
              className="-translate-x-6 w-full max-h-[380px] object-contain object-center"
            />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:p-6">
          <h2 className="text-2xl font-bold mb-2">Log in to Loope</h2>
          <p className="text-gray-600 mb-4">Enter your details below</p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 bg-red-50 p-2 rounded border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <div className={`mb-1 ${!errorData.email ? "pb-5" : ""}`}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 ${errorData.email ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
                placeholder="Enter your email"
              />
              {errorData.email && (
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
                  {errorData.email}
                </p>
              )}
            </div>

            <div className={` ${!errorData.password ? "pb-5" : ""} mb-1`}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your"
                  className={`mt-1 ${errorData.password ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
                  value={userData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
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
              {errorData.password && (
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
                  {errorData.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-5">
              <ButtonWithLoading
                buttonName="Sign In"
                isLoading={isLoading}
                otherClass="px-8 !py-2 !text-base w-32 h-[42px] flex justify-center items-center"
              />

              <Link
                to="/forgotpass"
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200"
              onClick={() => onSignWithGoogle()}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                  fill="#18403C"
                />
              </svg>
              Continue with Google
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-[#9FAAA6]">
              You don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#18403C] ml-1 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
