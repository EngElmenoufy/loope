import { useState } from "react";
import Button from "../../components/Button/Button";

export default function SavedAddresses({
  onClose,
  selectedDeliveryDetails,
  handleBackToAddressSelection,
  handleAddressSelection,
}) {
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
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Saved Addresses
      </h2>
      <form onSubmit={handleAddNewAddress} className="space-y-4">
        <div>
          <label className="block text-base font-semibold text-gray-800">
            Country
          </label>
          <select
            className="w-full p-3 border rounded-md bg-white"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Egypt</option>
          </select>
        </div>

        <div>
          <label
            className="block text-base font-semibold text-gray-800"
            htmlFor="city"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="City"
          />
        </div>

        <div>
          <label
            className="block text-base font-semibold text-gray-800"
            htmlFor="streetName"
          >
            Street Name / Area
          </label>
          <input
            type="text"
            id="streetName"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Street Name / Area"
          />
        </div>

        <div>
          <label
            className="block text-base font-semibold text-gray-800"
            htmlFor="apartmentNumber"
          >
            Apartment Number / Building
          </label>
          <input
            id="apartmentNumber"
            type="text"
            value={apartmentNumber}
            onChange={(e) => setApartmentNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Apartment Number / Building"
          />
        </div>

        <Button
          type="main"
          text="Save address"
          otherClass="!w-fit !capitalize"
          onClick={(e) => handleAddNewAddress(e)}
        />
      </form>
    </div>
  );
}
