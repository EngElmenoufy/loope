import React from "react";
import ButtonWithLoading from "./ButtonWithLoading/ButtonWithLoading";

const CounterOffer = ({
  isOpen,
  onClose,
  title,
  request,
  setSelectedOrder,
  handleSubmitCounterOffer,
  children,
  setShowCounterOfferModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Backdrop with blur */}
      <div className="fixed inset-0 backdrop-blur-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden relative">
        <button
          className="absolute top-4 right-3 text-gray-500 hover:text-red-700"
          onClick={onClose}
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="p-4">{children}</div>
        <div className="p-4 border-t">
          {/* <ButtonWithLoading buttonName='CONFIRM' onClick={!isOpen} otherClass='w-full py-4'/> */}
          {/* <button
            type="submit"
            onClick={onSubmitCounterOffer}
            className="button-primary w-full"
          >
            CONFIRM
          </button> */}
          <ButtonWithLoading
            buttonName={"CONFIRM"}
            otherClass="w-full py-[10px]"
            onLoading={() => handleSubmitCounterOffer("counter")}
          />
          <button
            onClick={() => setShowCounterOfferModal(false)}
            className="w-full mt-3 custom-btn  bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-600 "
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterOffer;
