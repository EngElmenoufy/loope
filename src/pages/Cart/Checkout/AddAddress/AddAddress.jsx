import { useState } from "react";
import Button from "../../../../components/Button/Button";

function AddAddress({
  onClose,
  deliveryDetails,
  onChangeDeliveryDetails,
  handleBackToAddressSelection,
  handleAddressSelection,
}) {
  const [details, setDetails] = useState({
    city: deliveryDetails.shippingAddress.city,
    street: deliveryDetails.shippingAddress.street,
    flat: deliveryDetails.shippingAddress.flat,
    phone: deliveryDetails.shippingAddress.phone,
  });

  const [errorData, setErrorData] = useState({
    city: "",
    street: "",
    phone: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "city":
        if (!value.trim()) return "Please enter your city";
        return "";
      case "street":
        if (!value.trim()) return "Please enter your street";
        return "";
      case "phone":
        if (!value) return "Please enter your phone number";
        if (!value.startsWith("01")) return "Phone number must start with 01";
        if (value.length !== 11) return "Phone number must be 11 digits long";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    if (errorData[name]) {
      setDetails((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const [phoneNumber, setPhoneNumber] = useState(
  //   selectedDeliveryDetails.phoneNumber
  // );
  // const [streetName, setStreetName] = useState("");
  // const [apartmentNumber, setApartmentNumber] = useState("");
  // const [city, setCity] = useState("");

  const handleAddNewAddress = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    let hasErrors = false;

    Object.keys(details).forEach((key) => {
      const error = validateField(key, details[key]);
      newErrors[key] = error;
      if (error) hasErrors = true;
    });

    setErrorData(newErrors);

    if (hasErrors) return;

    handleAddressSelection();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-white rounded-t-lg">
        <div className="p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button onClick={handleBackToAddressSelection} className="mr-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <h2 className="text-xl font-semibold">Enter an address</h2>
            </div>
            <button onClick={onClose} className="text-gray-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form className="space-y-4">
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
                  value={details.phone}
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
                value={details.city}
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
                Street Name / Area
              </label>
              <input
                type="text"
                name="street"
                id="street"
                value={details.street}
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
                Apartment Number / Building
              </label>
              <input
                type="text"
                name="flat"
                id="flat"
                value={details.flat}
                onChange={handleChange}
                className={`mt-1 ${errorData.flat ? "border-[#E14627]" : "border-gray-300"} block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none`}
                placeholder="Apartment Number / Building"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Province (optional)
              </label>
              <select className="w-full p-3 border rounded-md bg-white">
                <option>Select province</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal code (optional)
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-md"
                placeholder="Enter your postal code"
              />
            </div> */}

            <Button
              type="main"
              text="Save address"
              otherClass="!w-full"
              onClick={(e) => handleAddNewAddress(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
