import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import CounterOffer from "../../../components/CounterOffer";
import Alert from "@mui/material/Alert";

function CartItem({ item, onUpdate, onRemove, token }) {
  const [offerPrice, setOfferPrice] = useState("");
  const [isOffered, setIsOffered] = useState(false);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [counterOffer, setCounterOffer] = useState(false);
  const [productStatus, setProductStatus] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const itemData = item.productId;

  const [quantity, setQuantity] = useState(item.quantity);

  const price = Number(item.price) * Number(item.quantity);

  // const quantityOptions = [];

  const quantityOptions = Array.from(
    { length: itemData.stock_quantity },
    (_, i) => (i + 1).toString()
  );

  const checkProductStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/negotiation/status/${itemData._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.data.status) {
        setProductStatus(data.data.status);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    checkProductStatus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNegotiation(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    setQuantity(value);
    // console.log(value);
    onUpdate(itemData._id, value);
  };

  const handleSubmitCounterOffer = async () => {
    const offerData = {
      productId: itemData._id,
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
      checkProductStatus();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      setOfferPrice("");
      return () => clearTimeout(timer);
      // setIsLoading((prev) => ({ ...prev, user: false }));
    }
  };

  return (
    <>
      <div className="bg-white shadow-md flex gap-4 p-4 rounded-md max-h-40">
        <div className="w-32 flex justify-center items-center">
          <img
            src={
              itemData.img && itemData?.img.length > 0
                ? itemData?.img[0]
                : "../../../../public/cards/card1.png"
            }
            alt=""
            className="h-full object-cover object-center"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between px-2">
          <div className={`w-full flex justify-between items-center`}>
            <div>
              {/* <h4>Product name</h4> */}
              {/* <span className="block text-lg font-semibold">Product Name</span> */}
              <Link
                to={`/product/${itemData._id}`}
                className="text-black text-lg font-semibold hover:underline text-nowrap overflow-hidden text-ellipsis"
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
                      EGP
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      {itemData.price} EGP
                      <span className="text-gray-700 ml-4 rounded-lg text-xs bg-green-400 px-1">
                        {itemData.discount}% off
                      </span>
                    </span>
                  </>
                ) : (
                  <span className="text-lg text-[#18403C] font-medium">
                    {itemData.price} EGP
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
            {itemData.isNegotiable && showNegotiation ? (
              <>
                {!productStatus ? (
                  <>
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
                        <p>Customer offering price is {item.price} EGP</p>
                        <input
                          type="text"
                          placeholder="Enter Your Counter Offer"
                          className="w-full border rounded-md p-2"
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                        />
                      </div>
                    </CounterOffer>
                  </>
                ) : (
                  <div className="animate-opacity group relative p-[6.4px]">
                    {productStatus === "pending" ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#ffdf20"
                        >
                          <path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z" />
                        </svg>
                        <p className="absolute invisible group-hover:visible transition-all duration-300 w-fit text-nowrap rounded-lg -bottom-7 bg-[#ffdf20] px-1 right-0">
                          Your offer is pending
                        </p>
                      </>
                    ) : productStatus === "accepted" ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#63b365"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                        <p className="absolute invisible text-white group-hover:visible transition-all duration-300 w-fit text-nowrap rounded-lg -bottom-7 bg-[#63b365] px-1 right-0">
                          Your offer has been accepted successfully.
                        </p>
                      </>
                    ) : productStatus === "rejected" ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#d14249"
                        >
                          <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                        <p className="absolute invisible text-white group-hover:visible transition-all duration-300 w-fit text-nowrap rounded-lg -bottom-7 bg-[#d14249] px-1 right-0">
                          Your offer has been rejected.
                        </p>
                      </>
                    ) : productStatus === "countered" ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#131165"
                        >
                          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                        <p className="absolute invisible text-white group-hover:visible transition-all duration-300 w-fit text-nowrap rounded-lg -bottom-7 bg-[#131165] px-1 right-0">
                          Your offer has been countered by the seller.
                        </p>
                      </>
                    ) : null}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
      {showMessage && (
        <Alert severity="success" className="fixed bottom-4 right-4 z-50">
          You are successfully send the offer to the seller wait to response.
        </Alert>
      )}
    </>
  );
}

export default CartItem;
