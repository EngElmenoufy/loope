import { useState } from "react";
import PaymentMethod from "../../../components/PaymentMethod/PaymentMethod";
import Button from "../../../components/Button/Button";

export default function OrderSummary({ onCheckout, method, onChangeMethod }) {
  return (
    <div className="mt-4">
      <h3>How you'll pay</h3>
      <PaymentMethod method={method} onChangeMethod={onChangeMethod} />
      <div className="flex flex-col my-4 ">
        <div className="flex justify-between items-center pb-2">
          <span className="text-lg">Items (2)</span>
          <span className="text-lg font-semibold">400 AED</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-lg">Discount</span>
          <span className="text-lg font-semibold">100 AED</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <span className="text-lg">Total Price</span>
          <span className="text-lg font-semibold">300 AED</span>
        </div>
        <Button
          type="main"
          text="Proceed to Checkout"
          otherClass="!w-full !rounded-full !p-3"
          onClick={onCheckout}
        />
      </div>
    </div>
  );
}
