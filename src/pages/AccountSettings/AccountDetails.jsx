import { useState } from "react";
import Button from "../../components/Button/Button";
import ButtonWithLoading from "../../components/ButtonWithLoading/ButtonWithLoading";

function AccountDetails({
  user,
  onSubmit,
  formError,
  successMessage,
  isLoading,
}) {
  const [userData, setUserData] = useState({
    ...user,
  });

  const [errorData, setErrorData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    if (errorData[name]) {
      setErrorData((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Handle numeric input for phone number
    const numericValue =
      name === "phone" ? value.replace(/[^0-9]/g, "") : value;

    setUserData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  // const validateField = (name, value) => {
  //   switch (name) {
  //     case "phone":
  //       if (!value) return "Please enter your phone number";
  //       if (!value.startsWith("01")) return "Phone number must start with 01";
  //       if (value.length !== 11) return "Phone number must be 11 digits long";
  //       return "";
  //     case "date":
  //       if (!value || value === "YYYY-MM-DD")
  //         return "Please enter your birthday";
  //       return "";
  //     default:
  //       return "";
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    // const newErrors = {};
    // let hasErrors = false;

    // Object.keys(userData).forEach((key) => {
    //   const error = validateField(key, userData[key]);
    //   newErrors[key] = error;
    //   if (error) hasErrors = true;
    // });

    // setErrorData(newErrors);

    // if (hasErrors) return;

    onSubmit(userData, "accountDetails");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Account Details
      </h2>

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
        <div className={`mb-1 ${!errorData.firstName ? "pb-5" : ""}`}>
          <label
            htmlFor="fname"
            className="block text-base font-semibold text-gray-800"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="fname"
            value={userData.firstName}
            onChange={handleChange}
            className={`mt-1 ${errorData.firstName ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter your first name"
          />
          {errorData.firstName && (
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
              {errorData.firstName}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.lastName ? "pb-5" : ""}`}>
          <label
            htmlFor="lname"
            className="block text-base font-semibold text-gray-800"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            className={`mt-1 ${errorData.lastName ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter your last name"
          />
          {errorData.lastName && (
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
              {errorData.lastName}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.phone ? "pb-5" : ""}`}>
          <label
            htmlFor="phone"
            className="block text-base font-semibold text-gray-800"
          >
            Phone Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="phone"
              id="phone"
              value={userData.phone}
              onChange={handleChange}
              className={`mt-1 ${errorData.phone ? "border-[#E14627]" : "border-gray-300"} block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none`}
              placeholder="Enter your phone number"
              maxLength={11}
            />
            {errorData.phone && (
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
                    d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM6.5999 3.00002C6.5999 2.77901 6.42091 2.60002 6.1999 2.60002C5.97889 2.60002 5.7999 2.77901 5.7999 3.00002V6.00002C5.7999 6.22103 5.97889 6.40002 6.1999 6.40002C6.42091 6.40002 6.5999 6.22103 6.5999 6.00002V3.00002ZM6.1999 8.40002C6.64173 8.40002 6.9999 8.04185 6.9999 7.60002C6.9999 7.15819 6.64173 6.80002 6.1999 6.80002C5.75807 6.80002 5.3999 7.15819 5.3999 7.60002C5.3999 8.04185 5.75807 8.40002 6.1999 8.40002Z"
                    fill="#E14627"
                  />
                </svg>
                {errorData.phone}
              </p>
            )}
          </div>
        </div>

        <div className={`mb-1 ${!errorData.date ? "pb-5" : ""}`}>
          <label
            htmlFor="date"
            className="block text-base font-semibold text-gray-800"
          >
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="date"
              name="date"
              id="date"
              value={userData.date}
              onChange={handleChange}
              className={`mt-1 ${errorData.date ? "border-[#E14627]" : "border-gray-300"} block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none`}
            />
            {errorData.date && (
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
                    d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM6.5999 3.00002C6.5999 2.77901 6.42091 2.60002 6.1999 2.60002C5.97889 2.60002 5.7999 2.77901 5.7999 3.00002V6.00002C5.7999 6.22103 5.97889 6.40002 6.1999 6.40002C6.42091 6.40002 6.5999 6.22103 6.5999 6.00002V3.00002ZM6.1999 8.40002C6.64173 8.40002 6.9999 8.04185 6.9999 7.60002C6.9999 7.15819 6.64173 6.80002 6.1999 6.80002C5.75807 6.80002 5.3999 7.15819 5.3999 7.60002C5.3999 8.04185 5.75807 8.40002 6.1999 8.40002Z"
                    fill="#E14627"
                  />
                </svg>
                {errorData.date}
              </p>
            )}
          </div>
        </div>

        <ButtonWithLoading
          buttonName="Edit Profile"
          isLoading={isLoading}
          otherClass="w-[107px]"
        />
      </form>
    </div>
  );
}

export default AccountDetails;
