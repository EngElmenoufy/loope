// export default function Checkout() {
//   return (
//     <div className="">
//       <h3>Checkout</h3>
//       <div className="flex flex-col gap-4 mt-4">
//         <div className="flex justify-between items-center border-b pb-4">
//           <span className="text-lg">Items (2)</span>
//           <span className="text-lg font-semibold">400 AED</span>
//         </div>
//         <div className="flex justify-between items-center border-b pb-4">
//           <span className="text-lg">Discount</span>
//           <span className="text-lg font-semibold">100 AED</span>
//         </div>
//         <div className="flex justify-between items-center border-b pb-4">
//           <span className="text-lg">Total Price</span>
//           <span className="text-lg font-semibold">300 AED</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import DoubleCheckOrderDetails from "./DoubleCheckOrderDetails/DoubleCheckOrderDetails";
import AddressSelection from "./AddressSelection/AddressSelection";
import AddAddress from "./AddAddress/AddAddress";

// Main Modal Component
export default function Checkout({
  isOpen,
  onClose,
  details,
  onChangeDetails,
  itemsCount,
  total,
  totalWithDiscount,
}) {
  const [currentView, setCurrentView] = useState("checkout");

  const allAddressFieldsEmpty = Object.values(details.shippingAddress).every(
    (val) => !val
  );

  const [errorAddress, setErrorAddress] = useState(false);

  // Reset view when modal is opened
  // useEffect(() => {
  //   if (isOpen) {
  //     setCurrentView("checkout");
  //   }
  // }, [isOpen]);

  // Handle modal close and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle click outside the modal
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShipToClick = () => {
    setCurrentView("selectAddress");
  };

  const handleAddressSelection = () => {
    setErrorAddress(false);
    setCurrentView("checkout");
  };

  const handleAddNewAddress = () => {
    setCurrentView("addAddress");
  };

  const handleBackToCheckout = () => {
    setCurrentView("checkout");
  };

  const handleBackToAddressSelection = () => {
    setCurrentView("selectAddress");
  };

  const handleSubmitOrder = () => {
    // Here you would add logic to process the order
    if (allAddressFieldsEmpty) {
      setErrorAddress(true);
      return;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
      onClick={handleOutsideClick}
    >
      <div
        className={`max-md:absolute max-md:bottom-0 max-md:left-0 w-full md:mt-0 md:max-w-lg lg:max-w-2xl bg-white rounded-lg max-md:rounded-b-none shadow-lg max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {currentView === "checkout" && (
          <DoubleCheckOrderDetails
            onClose={onClose}
            handleShipToClick={handleShipToClick}
            total={total}
            itemsCount={itemsCount}
            totalWithDiscount={totalWithDiscount}
            handleSubmitOrder={handleSubmitOrder}
            details={details}
            onChangeDetails={onChangeDetails}
            errorAddress={errorAddress}
          />
        )}
        {currentView === "selectAddress" && (
          <AddressSelection
            onClose={onClose}
            handleBackToCheckout={handleBackToCheckout}
            selectedDeliveryDetails={details}
            handleAddressSelection={handleAddressSelection}
            handleAddNewAddress={handleAddNewAddress}
          />
        )}
        {currentView === "addAddress" && (
          <AddAddress
            onClose={onClose}
            deliveryDetails={details}
            onChangeDeliveryDetails={onChangeDetails}
            handleBackToAddressSelection={handleBackToAddressSelection}
            handleAddressSelection={handleAddressSelection}
          />
        )}
      </div>
    </div>
  );
}
