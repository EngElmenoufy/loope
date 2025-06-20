import { useState } from "react";
import Button from "../../components/Button/Button";
import ButtonWithLoading from "../../components/ButtonWithLoading/ButtonWithLoading";

export default function SavedAddresses({
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
    city: "",
    street: "",
    flat: "",
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

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const validateField = (name, value) => {
  //   switch (name) {
  //     case "city":
  //       if (!value) return "Please enter your city";
  //       return "";
  //     case "street":
  //       if (!value) return "Please enter your street name";
  //       return "";
  //     case "flat":
  //       if (!value) return "Please enter your building number";
  //       return "";
  //     default:
  //       return "";
  //   }
  // };

  const handleSubmit = async (e) => {
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

    onSubmit(userData, "address");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Saved Addresses
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
        <div className={`mb-1 ${!errorData.city ? "pb-5" : ""}`}>
          <label
            htmlFor="city"
            className="block text-base font-semibold text-gray-800"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={userData.city}
            onChange={handleChange}
            className={`mt-1 ${errorData.city ? "border-[#E14627]" : "border-gray-300"} block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter your city"
          />
          {errorData.city && (
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
              {errorData.city}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.street ? "pb-5" : ""}`}>
          <label
            htmlFor="street"
            className="block text-base font-semibold text-gray-800"
          >
            Street
          </label>
          <input
            type="text"
            name="street"
            id="street"
            value={userData.street}
            onChange={handleChange}
            className={`mt-1 ${errorData.street ? "border-[#E14627]" : "border-gray-300"} block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none`}
            placeholder="Street Name / Area"
          />
          {errorData.street && (
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
              {errorData.street}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.flat ? "pb-5" : ""}`}>
          <label
            htmlFor="flat"
            className="block text-base font-semibold text-gray-800"
          >
            Flat
          </label>
          <input
            type="text"
            name="flat"
            id="flat"
            value={userData.flat}
            onChange={handleChange}
            className={`mt-1 ${errorData.flat ? "border-[#E14627]" : "border-gray-300"} block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none`}
            placeholder="Apartment Number / Building"
          />
          {errorData.flat && (
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
              {errorData.flat}
            </p>
          )}
        </div>

        <ButtonWithLoading
          buttonName="Save Address"
          isLoading={isLoading}
          otherClass="w-[126px]"
        />
      </form>
    </div>
  );
}
