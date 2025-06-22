import React, { useState, useEffect } from "react";
import CounterOffer from "../../../../components/CounterOffer";
import { Link } from "react-router-dom";

function SingleApprovedSalesRequests({
  request,
  isSeller,
  // setSelectedOrder,
  // selectedOrder,
}) {
  const showDetailsAbout = isSeller ? "buyer" : "seller";
  // const [showCounterOfferModal, setShowCounterOfferModal] = useState(false);
  // const [customerOfferPrice, setCustomerOfferPrice] = useState("");
  // const [sellerOfferPrice, setSellerOfferPrice] = useState("");

  // const handleAccept = () => {
  //   setSellerOfferPrice(customerOfferPrice);
  // };

  // const handleReject = () => {
  //   setSellerOfferPrice(null);
  // };
  // const handleCounterOffer = () => {
  //   setSelectedOrder(order);
  //   setShowCounterOfferModal(true);
  // };
  // const handleSubmitCounterOffer = () => {
  //   setShowCounterOfferModal(false);
  // };

  return (
    <div key={request.id} className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Link
          to={`/profile/${request[showDetailsAbout].id}`}
          className="flex items-center w-fit cursor-pointer"
        >
          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
            <img
              src={
                request[showDetailsAbout]?.avatar ===
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPwA="
                  ? "profile.jpg"
                  : request[showDetailsAbout]?.avatar
              }
              alt={request[showDetailsAbout]?.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-xl">
              {request[showDetailsAbout]?.name}
            </h2>
          </div>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 lg:w-1/4 max-h-64">
          <div className="aspect-square overflow-hidden rounded-md">
            <img
              src={request.productImage}
              alt={request.productName}
              className="w-full max-h-64 object-contain object-center"
            />
          </div>
        </div>

        <div className="flex-1">
          <Link
            to={`/product/${request.productId}`}
            className="text-xl font-bold mb-5 hover:underline text-nowrap overflow-hidden text-ellipsis"
          >
            {request.productName}
          </Link>

          <div className="space-y-1 mb-4">
            <p className="text-lg mb-2">
              <span className="font-bold">Request Date:</span>{" "}
              <span className="text-xl">
                {new Date(request.date).toDateString()}
              </span>
            </p>

            <p className="text-lg mb-2">
              <span className="font-bold">Original Price:</span>{" "}
              <span className="text-xl">{request.originalPrice} EGP</span>
            </p>

            <p className="text-lg mb-2">
              <span className="font-bold">Offered Price:</span>{" "}
              <span className="text-xl">{request.offeredPrice} EGP</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleApprovedSalesRequests;
