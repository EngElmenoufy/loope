import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function SinglePastSale({ order }) {
  const [trackOrder, setTrackOrder] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleRating = () => {
    const numOfStars = Array.from({ length: rating }, (_, i) => i + 1);
    return numOfStars.map(() => (
      <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
    ));
  };
  const sampleProduct = {
    username: "TOM",
    location: "Dubai, United Arab Emirates",
    name: "LOOSE DENIM JACKET",
    variant: "White, Large (L)",
    price: "30 EGP x 1",
    userImage: null, // You can add a real image path here
    image: null, // You can add a real image path here
  };
  return (
    <div className="card rounded-md">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
          <img
            src={order.userAvatar}
            alt={order.userName}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">{order.userName}</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img
            src={order.productImage}
            alt={order.productName}
            className="w-full rounded-md"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">{order.productName}</h2>
          <p className="text-gray-700 mb-4">{order.productDescription}</p>

          <div className="space-y-1 mb-4 text-xl">
            <p>
              <span className="font-bold">Order ID:</span>{" "}
              <span>{order.orderId}</span>{" "}
            </p>
            <p>
              <span className="font-bold">Order Date:</span>{" "}
              <span>{order.orderDate}</span>{" "}
            </p>
            <p>
              <span className="font-bold">Transaction ID:</span>{" "}
              <span>{order.transactionId}</span>{" "}
            </p>
            <p>
              <span className="font-bold">Payment:</span>{" "}
              <span>{order.paymentMethod}</span>{" "}
            </p>
            <p>
              {" "}
              <span className="text-[#020817] text-lg font-bold">
                Price: {order.price} {order.currency}
              </span>
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="font-medium text-lg">
                {" "}
                <span className="font-bold">SHIPPING ADDRESS:</span>{" "}
                <span>12 street, Tanta, Egypt</span>
              </p>
            </div>
            <div>
              <p className="font-medium">
                <svg
                  className="h-5 w-5 text-white inline bg-green-900 rounded-full me-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="font-bold">DELIVERED:</span>
                {order.estimatedDelivery}
              </p>
            </div>
          </div>
          {rating == 0 ? (
            <button
              className="bg-primary-green text-white inline-block p-2 px-20 rounded-md hover:bg-[#174e47]"
              onClick={() => setIsRateModalOpen(true)}
            >
              Rate
            </button>
          ) : (
            <div className="inline-block px-2 bg-gradient-to-r from-green-200 via-green-400 to-green-600">
              you 've reviewed it with {handleRating()} star
            </div>
          )}
          <ReviewModal
            isOpen={isRateModalOpen}
            onClose={() => setIsRateModalOpen(false)}
            product={sampleProduct}
            setRating={setRating}
            setReview={setReview}
            rating={rating}
            review={review}
          />
        </div>
      </div>
    </div>
  );
}

export default SinglePastSale;
