import { useRef, useState } from "react";
import ButtonWithLoading from "../../components/ButtonWithLoading/ButtonWithLoading";

function ProfileCreation({ error }) {
  const [userData, setUserData] = useState({
    image: null,
    preview: null,
    phoneNumber: "",
    birthday: "YYYY-MM-DD",
    city: "",
    street: "",
    buildingNumber: "",
    termsAccepted: false,
  });

  const [errorData, setErrorData] = useState({
    image: "",
    preview: "",
    phoneNumber: "",
    birthday: "",
    city: "",
    street: "",
    buildingNumber: "",
    termsAccepted: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const profileImageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prevData) => ({
        ...prevData,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phoneNumber") {
      // Validate phone number (starts with "01" and has 11 digits)
      const isValid = value.startsWith("01") && value.length === 11;
      setErrorData((prev) => ({
        ...prev,
        phoneNumber: isValid
          ? ""
          : "Phone number must start with 01 and be 11 digits long.",
      }));
    } else if (name === "birthday") {
      const isValid = value !== "YYYY-MM-DD";
      setErrorData((prev) => ({
        ...prev,
        birthday: isValid ? "" : "You should enter your birthday.",
      }));
    } else if (name === "city") {
      const isValid = value.length !== 0;
      setErrorData((prev) => ({
        ...prev,
        city: isValid ? "" : "You should enter your city.",
      }));
    } else if (name === "street") {
      const isValid = value.length !== 0;
      setErrorData((prev) => ({
        ...prev,
        street: isValid ? "" : "You should enter your street name.",
      }));
    } else if (name === "buildingNumber") {
      const isValid = value.length !== 0;
      setErrorData((prev) => ({
        ...prev,
        buildingNumber: isValid ? "" : "You should enter your building number.",
      }));
    }

    // let errorMessage = "";

    // switch (name) {
    //   case "phoneNumber":
    //     errorMessage = "You should enter your phone number";
    //     return;
    //   case "birthday":
    //     errorMessage = "You should enter your birthday";
    //     return;
    //   case "city":
    //     errorMessage = "you should enter your city";
    //     return;
    //   case "street":
    //     errorMessage = "you should enter your street name";
    //     return;
    //   case "buildingNumber":
    //     errorMessage = "you should enter your building number";
    //     return;
    //   default:
    //     errorMessage = "you should enter your value";
    // }

    // if (
    //   name === "phoneNumber" &&
    //   !value.startsWith("01") &&
    //   value.length !== 11
    // ) {
    //   errorMessage = "Phone number must start with '01' and be 11 digits long.";
    // }

    // setErrorData((prev) => ({
    //   ...prev,
    //   [name]: errorMessage,
    // }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", userData);
    // Here you would typically send the data to your backend
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
            className={`${!userData.image ? "bg-[#C3E6C3]" : ""} overflow-hidden rounded-full w-20 h-20 flex items-center justify-center`}
          >
            {userData.image ? (
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
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
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

      <div className="">
        <div className={`mb-1 ${!errorData.phoneNumber ? "pb-5" : ""}`}>
          <label className="block text-base font-semibold text-gray-800">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 ${errorData.phoneNumber ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
              placeholder="Enter your phone number"
            />
            {errorData.phoneNumber && (
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
                {errorData.phoneNumber}
              </p>
            )}
          </div>
        </div>

        <div className={`mb-1 ${!errorData.birthday ? "pb-5" : ""}`}>
          <label
            className="block text-base font-semibold text-gray-800"
            id="birthday"
          >
            Date of Birth
          </label>
          <div className="relative">
            <input
              id="birthday"
              type="date"
              name="birthday"
              value={userData.birthday}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 ${errorData.birthday ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            />
            {errorData.birthday && (
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
                {errorData.birthday}
              </p>
            )}
          </div>
        </div>

        {/* <div>
          <label className="block text-base font-semibold text-gray-800">
            Country
          </label>
          <select
            className="w-full p-3 border rounded-md bg-white"
            value={userData.country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Egypt</option>
          </select>
        </div> */}

        <div className={`mb-1 ${!errorData.city ? "pb-5" : ""}`}>
          <label
            className="block text-base font-semibold text-gray-800"
            htmlFor="city"
          >
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={userData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 ${errorData.city ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.city}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.street ? "pb-5" : ""}`}>
          <label
            className="block text-base font-semibold text-gray-800"
            htmlFor="streetName"
          >
            Street Name / Area
          </label>
          <input
            type="text"
            name="street"
            id="streetName"
            value={userData.street}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 ${errorData.street ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.street}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.buildingNumber ? "pb-5" : ""}`}>
          <label
            className="block text-base font-semibold text-gray-800"
            htmlFor="apartmentNumber"
          >
            Apartment Number / Building
          </label>
          <input
            id="apartmentNumber"
            name="buildingNumber"
            onBlur={handleBlur}
            type="text"
            value={userData.buildingNumber}
            onChange={handleChange}
            className={`mt-1 ${errorData.buildingNumber ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Apartment Number / Building"
          />

          {errorData.buildingNumber && (
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
              {errorData.buildingNumber}
            </p>
          )}
        </div>

        <div className="flex items-start pt-2">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="termsAccepted"
              type="checkbox"
              checked={userData.termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 border border-gray-300 rounded text-green-700 focus:ring-green-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I understand and agree to all Terms of Use and Privacy Policy.
            </label>
          </div>
        </div>

        <div className="pt-4">
          <ButtonWithLoading
            buttonName="Create Profile"
            isLoading={isLoading}
            otherClass="w-full py-3"
          />
        </div>
      </div>
    </form>
  );
}

export default ProfileCreation;
