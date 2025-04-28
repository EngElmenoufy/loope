import { useState } from "react";
import Button from "../../../../components/Button/Button";

function AddAddress({
  onClose,
  selectedDeliveryDetails,
  handleBackToAddressSelection,
  handleAddressSelection,
}) {
  const [fullName, setFullName] = useState(selectedDeliveryDetails.fullName);
  const [phoneNumber, setPhoneNumber] = useState(
    selectedDeliveryDetails.phoneNumber
  );
  const [email, setEmail] = useState(selectedDeliveryDetails.email);
  const [address, setAddress] = useState(selectedDeliveryDetails.address);
  const [streetName, setStreetName] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    const newAddress = {
      fullName,
      phoneNumber,
      email,
      address: {
        streetName,
        apartmentNumber,
        city,
        country,
      },
    };
    console.log(newAddress);
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Name / Area <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="Street Name / Area"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment Number / Building
              </label>
              <input
                type="text"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="Apartment Number / Building"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-3 border rounded-md bg-white"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Egypt</option>
              </select>
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
