import { useState } from "react";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";
import OrderSummary from "./OrderSummary/OrderSummary";

export default function CartPage({
  user,
  cart,
  cartItemCount,
  onRemoveFromCart,
  onUpdateQuantity,
}) {
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  // const [method, setMethod] = useState("cash");
  const [deliveryDetails, setDeliveryDetails] = useState({
    sellerId: user._id,
    shippingAddress: {
      street: user.street,
      city: user.city,
      flat: user.flat,
      phone: user.phone,
    },
    paymentMethod: "cash",
  });

  const cartItems = cart?.cartItem;

  // const calculateItemSubtotal = (item) => {
  //   return item.price * item.quantity;
  // };

  // const calculateTotalPrice = () => {
  //   return cart.reduce((total, item) => {
  //     return total + calculateItemSubtotal(item);
  //   }, 0);
  // };

  // const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.totalPrice;

  return (
    <main className="py-2 md:py-4">
      <h2>Shopping Bag</h2>
      <div>
        <span>Total Price: {totalPrice}</span>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-4 lg:gap-8 mt-4">
        <div className="md:col-span-2 flex flex-col gap-6">
          {cartItems?.map((item) => (
            <CartItem
              key={item._id}
              onRemove={onRemoveFromCart}
              onUpdate={onUpdateQuantity}
              item={item}
            />
          ))}
          {/* <CartItem />
          <CartItem isNegotiable={true} /> */}
        </div>
        <div className="md:col-span-1">
          <OrderSummary
            onCheckout={() => setIsOpenCheckout(true)}
            method={deliveryDetails.paymentMethod}
            onChangeMethod={setDeliveryDetails}
            itemsCount={cartItemCount}
            total={totalPrice}
          />
          <Checkout
            isOpen={isOpenCheckout}
            onClose={() => setIsOpenCheckout(false)}
            details={deliveryDetails}
            onChangeDetails={setDeliveryDetails}
          />
        </div>
      </div>
    </main>
  );
}
