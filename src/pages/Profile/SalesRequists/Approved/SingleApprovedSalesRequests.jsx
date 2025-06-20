import React, { useState, useEffect } from "react";
import CounterOffer from "../../../../components/CounterOffer";

function SingleApprovedSalesRequests({ order, setSelectedOrder, selectedOrder }) {
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(false);
  const [customerOfferPrice, setCustomerOfferPrice] = useState("");
  const [sellerOfferPrice, setSellerOfferPrice] = useState("");

  const handleAccept = () => {
    setSellerOfferPrice(customerOfferPrice);
  };

  const handleReject = () => {
    setSellerOfferPrice(null);
  };
  const handleCounterOffer = () => {
    setSelectedOrder(order);
    setShowCounterOfferModal(true);
  };
  const handleSubmitCounterOffer = () => {
    setShowCounterOfferModal(false);
  };
  return (
    <div key={order.id} className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
            <img
              src={order.userAvatar}
              alt={order.userName}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold">{order.userName}</h2>
            <p className="text-sm text-gray-500">SMITH</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="aspect-square overflow-hidden rounded-md">
            <img
              src={order.productImage}
              alt={order.productName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{order.productName}</h3>
          <p className="text-sm mb-4">{order.productDescription}</p>

          <div className="space-y-1 mb-4">
            <p className="text-sm">
              <span className="font-medium">Order ID:</span> {order.orderId}
            </p>
            <p className="text-sm">
              <span className="font-medium">Order Date:</span> {order.orderDate}
            </p>
            <p className="text-sm">
              <span className="font-medium">Transaction ID:</span>{" "}
              {order.transactionId}
            </p>
            <p className="text-sm">
              <span className="font-medium">Payment:</span>{" "}
              {order.paymentMethod}
            </p>
            <p className="text-sm font-bold">
              Price: {order.price} {order.currency}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <p className="font-medium">SHIPPING ADDRESS</p>
        <p className="font-medium">
          ESTIMATED DELIVERY: {order.estimatedDelivery}
        </p>
      </div>

    </div>
  );
}

export default SingleApprovedSalesRequests;
