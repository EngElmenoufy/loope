import { useEffect, useRef, useState } from "react";
import ButtonWithLoading from "../../components/ButtonWithLoading/ButtonWithLoading";

function ProfileCreation({
  userData,
  setUserData,
  onSubmit,
  error,
  isLoading,
  onBack,
}) {
  const [errorData, setErrorData] = useState({
    image: "",
    preview: "",
    phone: "",
    date: "",
    city: "",
    street: "",
    flat: "",
    termsAccepted: "",
  });

  // const [isLoading, setIsLoading] = useState(false);
  // const preview =
  // const [preview, setPreview] = useState("");
  // const [termsAccepted, setTermAccepted] = useState(false);
  const profileImageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setPreview(URL.createObjectURL(file));
      setUserData((prevData) => ({
        ...prevData,
        avatar: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

    // if (type === "checkbox") {
    //   setTermAccepted(checked);
    //   return;
    // }

    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : numericValue,
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "phone":
        if (!value) return "Please enter your phone number";
        if (!value.startsWith("01")) return "Phone number must start with 01";
        if (value.length !== 11) return "Phone number must be 11 digits long";
        return "";
      case "date":
        if (!value || value === "YYYY-MM-DD")
          return "Please enter your birthday";
        return "";
      case "city":
        if (!value) return "Please enter your city";
        return "";
      case "street":
        if (!value) return "Please enter your street name";
        return "";
      case "termsAccepted":
        if (!value) return "You must accept the terms";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setErrorData((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    let hasErrors = false;

    Object.keys(userData).forEach((key) => {
      const error = validateField(key, userData[key]);
      newErrors[key] = error;
      if (error) hasErrors = true;
    });

    setErrorData(newErrors);

    if (hasErrors) return;

    onSubmit(true);
  };

  const handleCompleteLater = async (e) => {
    e.preventDefault();

    onSubmit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 bg-red-50 p-2 rounded border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={profileImageRef}
        className="hidden"
        onChange={(e) => handleImageUpload(e)}
      />
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div
            className={`${!userData.avatar ? "bg-[#C3E6C3]" : ""} overflow-hidden rounded-full w-20 h-20 flex items-center justify-center`}
          >
            {userData.avatar ? (
              <img
                src={userData.preview}
                alt="user profile"
                className="w-full object-contain object-center"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26px"
                viewBox="0 -960 960 960"
                width="26px"
                fill="#18403c"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66 47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
              </svg>
            )}
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-[#18403c] rounded-full p-1 text-white"
            onClick={() => profileImageRef.current.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <div className={`mb-1 ${!errorData.phone ? "pb-5" : ""}`}>
          <label
            htmlFor="phone"
            className="block text-base font-semibold text-gray-800"
          >
            Phone Number <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="phone"
              id="phone"
              value={userData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
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
            Date of Birth <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              name="date"
              id="date"
              value={userData.date}
              onChange={handleChange}
              onBlur={handleBlur}
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

        <div className={`mb-1 ${!errorData.city ? "pb-5" : ""}`}>
          <label
            htmlFor="city"
            className="block text-base font-semibold text-gray-800"
          >
            City <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={userData.city}
            onChange={handleChange}
            onBlur={handleBlur}
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
            Street Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="street"
            id="street"
            value={userData.street}
            onChange={handleChange}
            onBlur={handleBlur}
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
            Apartment Number
          </label>
          <input
            type="text"
            name="flat"
            id="flat"
            value={userData.flat}
            onChange={handleChange}
            onBlur={handleBlur}
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

        <div
          className={`flex flex-col justify-center mb-1 ${!errorData.termsAccepted ? "pb-5" : ""}`}
        >
          <div>
            <input
              name="termsAccepted"
              id="termsAccepted"
              type="checkbox"
              checked={userData.termsAccepted}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="termsAccepted" className="cursor-pointer">
              I understand and agree to all Terms of Use and Privacy Policy.
            </label>
          </div>
          {errorData.termsAccepted && (
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
              {errorData.termsAccepted}
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

          <ButtonWithLoading
            buttonName="Create Profile"
            isLoading={isLoading}
            otherClass="flex-1"
          />
        </div>

        <div className="mt-6">
          <span className="text-[#9FAAA6]">
            You can complete your profile information later
          </span>
          <button
            onClick={handleCompleteLater}
            className="text-[#18403C] ml-1 font-medium hover:underline"
          >
            Complete Later.
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfileCreation;
