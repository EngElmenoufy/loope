import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import CounterOffer from "../../../components/CounterOffer";
import Alert from "@mui/material/Alert";

function CartItem({ item, onUpdate, onRemove, token }) {
  const [offerPrice, setOfferPrice] = useState("");
  const [counterOffer, setCounterOffer] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const itemData = item.productId;

  const [quantity, setQuantity] = useState(item.quantity);

  const price = Number(item.price) * Number(item.quantity);

  // const quantityOptions = [];

  const quantityOptions = Array.from(
    { length: itemData.stock_quantity },
    (_, i) => (i + 1).toString()
  );

  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    setQuantity(value);
    // console.log(value);
    onUpdate(itemData._id, value);
  };

  const handleSubmitCounterOffer = async () => {
    const offerData = {
      productId: item.productId._id,
      price: offerPrice,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/negotiation/offer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(offerData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);
      setShowMessage(true);
      setCounterOffer(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      setOfferPrice("");
      // setIsLoading((prev) => ({ ...prev, user: false }));
    }
  };

  console.log(itemData);

  return (
    <>
      <div className="bg-white shadow-md flex gap-4 p-4 rounded-md max-h-40">
        <div className="w-32">
          <img
            src={
              itemData.img && itemData?.img.length > 0
                ? itemData?.img[0]
                : "../../../../public/cards/card1.png"
            }
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between px-2">
          <div className={`w-full flex justify-between items-center`}>
            <div>
              {/* <h4>Product name</h4> */}
              {/* <span className="block text-lg font-semibold">Product Name</span> */}
              <Link
                to={`/product/${itemData._id}`}
                className="text-black text-lg font-semibold hover:underline"
              >
                {itemData.name}
              </Link>

              <div className="flex flex-col mb-1">
                {itemData.discount ? (
                  <>
                    <span className="text-lg text-[#18403C] font-medium">
                      {(itemData.price * (1 - itemData.discount / 100)).toFixed(
                        2
                      )}{" "}
                      AED
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      {itemData.price} AED
                      <span className="text-gray-700 ml-4 rounded-lg text-xs bg-green-400 px-1">
                        {itemData.discount}% off
                      </span>
                    </span>
                  </>
                ) : (
                  <span className="text-lg text-[#18403C] font-medium">
                    {itemData.price} AED
                  </span>
                )}
              </div>
            </div>
            <button
              className="btn-icon icon-button hover:!bg-[#bdd8c6d4]"
              onClick={() => onRemove(itemData._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#18403c"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </div>
          <div className="flex gap-4 justify-between items-center my-2">
            <select
              name="quantity"
              className="mt-1 cursor-pointer w-fit px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              value={quantity}
              onChange={handleChangeQuantity}
            >
              {quantityOptions.map((quan) => (
                <option key={quan} value={quan}>
                  {quan}
                </option>
              ))}
            </select>
            <Button
              text="Make Offer"
              otherClass="!w-fit !px-2 !py-2"
              onClick={() => setCounterOffer(true)}
            />
            <CounterOffer
              isOpen={counterOffer}
              onClose={() => setCounterOffer(false)}
              title="Counter Offer"
              onSubmitCounterOffer={handleSubmitCounterOffer}
            >
              <div className="space-y-4">
                <p>Customer offering price is {item.price} AED</p>
                <input
                  type="text"
                  placeholder="Enter Your Counter Offer"
                  className="w-full border rounded-md p-2"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
              </div>
            </CounterOffer>
          </div>
        </div>
      </div>
      {showMessage && (
        <Alert
          severity="success"
          className="fixed top-32 lg:top-20 right-4 z-50"
        >
          You are successfully send the offer to the seller wait to response.
        </Alert>
      )}
    </>
  );
}

export default CartItem;
