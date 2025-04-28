import { useState } from "react";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";
import OrderSummary from "./OrderSummary/OrderSummary";

export default function CartPage() {
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  const [method, setMethod] = useState("cash");

  return (
    <main className="py-2 md:py-4">
      <h2>Shopping Bag</h2>
      <div>
        <span>Total Price: {300}</span>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-4 lg:gap-8">
        <div className="md:col-span-2">
          <CartItem />
          <CartItem isNegotiable={true} />
        </div>
        <div className="md:col-span-1">
          <OrderSummary
            onCheckout={() => setIsOpenCheckout(true)}
            method={method}
            onChangeMethod={setMethod}
          />
          <Checkout
            isOpen={isOpenCheckout}
            onClose={() => setIsOpenCheckout(false)}
            method={method}
            onChangeMethod={setMethod}
          />
        </div>
      </div>
    </main>
  );
}
