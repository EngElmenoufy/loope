import { useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";
import OrderSummary from "./OrderSummary/OrderSummary";
import Alert from "@mui/material/Alert";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function CartPage({
  user,
  cart,
  getCart,
  cartItemCount,
  onRemoveFromCart,
  onUpdateQuantity,
  token,
  SubmitChangeDeliveryDetails,
}) {
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
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

  const navigate = useNavigate();

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

  const [totalWithDiscount, setTotalWithDiscount] = useState(0);

  const calculateTotal = () => {
    return cartItems?.reduce((total, product) => {
      if (product.discount) {
        // Apply discount (subtract discount percentage from price)
        const discountedPrice = product.price * (1 - product.discount / 100);
        return total + discountedPrice;
      }
      // No discount, just add the price
      return total + product.price;
    }, 0);
  };

  useEffect(() => {
    setTotalWithDiscount(calculateTotal());
  }, [cart, cartItems]);

  const handleToContinueShopping = () => {
    navigate("/products");
  };

  const handleToFavorite = () => {
    navigate("/saved-items");
  };

  return (
    <main className="py-2 md:py-4 relative">
      {cartItems && cartItems.length !== 0 ? (
        <>
          <h2>Shopping Bag</h2>
          <div>
            <span>Total Price: {totalWithDiscount}</span>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-4 lg:gap-8 mt-4">
            <div className="md:col-span-2 flex flex-col gap-6">
              {cartItems?.map((item) => (
                <CartItem
                  key={item._id}
                  onRemove={onRemoveFromCart}
                  onUpdate={onUpdateQuantity}
                  item={item}
                  token={token}
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
                totalWithDiscount={totalWithDiscount}
              />
              <Checkout
                isOpen={isOpenCheckout}
                onClose={() => setIsOpenCheckout(false)}
                details={deliveryDetails}
                onChangeDetails={setDeliveryDetails}
                total={totalPrice}
                totalWithDiscount={totalWithDiscount}
                itemsCount={cartItemCount}
                token={token}
                getCart={getCart}
                setShowMessage={setShowMessage}
                user={user}
                SubmitChangeDeliveryDetails={SubmitChangeDeliveryDetails}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-gray-100 rounded-full p-8 mb-6">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-md">
            Looks like you haven't added anything to your cart yet. Start
            shopping to find amazing deals!
          </p>

          <div className="flex flex-col justify-center items-center sm:flex-row gap-4 mb-8">
            <Button
              type="main"
              text="Continue Shopping"
              otherClass="!px-6 !py-3 !rounded-full !w-fit"
              onClick={handleToContinueShopping}
            />
            <Button
              type="second"
              text="View Wishlist"
              otherClass="!px-6 !py-3 !rounded-full !w-fit "
              onClick={handleToFavorite}
            />
          </div>
        </div>
      )}
      {showMessage && (
        <Alert severity="success" className="fixed bottom-4 right-4 z-50">
          You have successfully ordered your products.
        </Alert>
      )}
    </main>
  );
}
