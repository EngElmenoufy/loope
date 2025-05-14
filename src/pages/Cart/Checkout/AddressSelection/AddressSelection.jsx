function AddressSelection({
  onClose,
  handleBackToCheckout,
  selectedDeliveryDetails,
  handleAddressSelection,
  handleAddNewAddress,
}) {
  return (
    <div className="p-4 w-full bg-white rounded-t-lg">
      <div className="p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button onClick={handleBackToCheckout} className="mr-2">
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
            <h3>Choose Delivery Details</h3>
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

        <div className="border rounded-lg p-4 mb-4 relative">
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            Default
          </span>
          <p className="text-sm text-gray-700">
            <span className="text-base text-gray-900 font-semibold">
              City:{" "}
            </span>{" "}
            {selectedDeliveryDetails.shippingAddress.city}
          </p>
          <p className="text-sm text-gray-700">
            <span className="text-base text-gray-900 font-semibold">
              Street:
            </span>{" "}
            {selectedDeliveryDetails.shippingAddress.street}
          </p>
          <p className="text-sm text-gray-700">
            <span className="text-base text-gray-900 font-semibold">
              Flat:{" "}
            </span>{" "}
            {selectedDeliveryDetails.shippingAddress.flat}
          </p>
          <p className="text-sm text-gray-700">
            <span className="text-base text-gray-900 font-semibold">
              Phone:{" "}
            </span>{" "}
            {selectedDeliveryDetails.shippingAddress.phone}
          </p>
        </div>

        <button
          onClick={handleAddNewAddress}
          className="w-full p-4 border border-gray-300 rounded-lg text-center"
        >
          Change Your Details
        </button>
      </div>
    </div>
  );
}

export default AddressSelection;
