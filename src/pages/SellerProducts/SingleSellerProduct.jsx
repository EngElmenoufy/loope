import React, { useState, useEffect } from "react";
import CounterOffer from "../../components/CounterOffer";

export const Star = ({ filled, onClick }) => {
  return (
    <svg
      className={`w-5 h-5 cursor-pointer ${
        filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

function SingleSellerProduct({
  product,
  setSelectedProduct,
  selectedProduct,
  updateSellerProduct,
  removeSellerProduct,
  getSellerProducts,
}) {
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);
  const [discount, setDiscount] = useState(
    product.discount ? product.discount : ""
  );
  const [isNegotiable, setIsNegotiable] = useState(product.isNegotiable);
  const [customerOfferPrice, setCustomerOfferPrice] = useState("");
  const [sellerOfferPrice, setSellerOfferPrice] = useState("");

  const handleEdit = () => {
    setSelectedProduct(product);
    setShowCounterOfferModal(true);
  };

  const handleDelete = () => {
    removeSellerProduct(product._id);
    const timer = setTimeout(() => {
      getSellerProducts();
    }, 1000);

    return () => clearTimeout(timer);
  };
  const handleSubmitCounterOffer = () => {
    setShowCounterOfferModal(false);
    const body = {};
    if (newPrice) {
      body.price = newPrice;
    }
    if (discount) {
      body.discount = discount;
    }
    if (isNegotiable) {
      body.isNegotiable = isNegotiable;
    }
    updateSellerProduct(product._id, body);

    const timer = setTimeout(() => {
      getSellerProducts();
    }, 1000);

    return () => clearTimeout(timer);
  };
  return (
    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4"></div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="aspect-square overflow-hidden rounded-md h-3/4 w-3/4">
            <img
              src={product.img[0]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <p className="text-sm mb-4">{product.description}</p>

          <div className="space-y-1 mb-4">
            <p className="text-sm font-bold">
              <span className="">Condition:</span> {product.condition}
            </p>

            <p className="text-sm font-bold">Price: {product.price}</p>

            {product.discount && (
              <p className="text-sm font-bold">Discount: {product.discount}</p>
            )}

            <p className="text-sm font-bold">
              Negotiation Availability: {product.isNegotiable ? "Yes" : "No"}
            </p>
            <p className="text-sm font-bold">
              Stock Quantity: {product.stock_quantity}
            </p>
            <p className="text-sm font-bold">
              <div className="flex space-x-2">
                <span>Rating: </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} filled={star <= product.averageRate} />
                ))}
              </div>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md"
              onClick={() => handleEdit(product)}
            >
              EDIT
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
              onClick={() => handleDelete()}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>

      {/* Counter Offer Modal */}
      <CounterOffer
        isOpen={showCounterOfferModal}
        onClose={() => setShowCounterOfferModal(false)}
        title="Edit Product Details"
        product={product}
        handleSubmitCounterOffer={handleSubmitCounterOffer}
        setShowCounterOfferModal={setShowCounterOfferModal}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div>
              <label for="#price">Price :</label>
              <input
                id="price"
                type="text"
                placeholder="Enter new price"
                className="w-full border rounded-md p-2"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div>
              <label for="#discount">Discount :</label>
              <input
                id="discount"
                type="text"
                placeholder="Add new discount"
                className="w-full border rounded-md p-2"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div>
              <input
                id="isNegotiable"
                type="checkbox"
                // checked={product.isNegotiable}
                checked={isNegotiable}
                onChange={() => setIsNegotiable((prev) => !prev)}
                className="mr-2 cursor-pointer"
              />
              <label htmlFor="isNegotiable" className="cursor-pointer">
                Is price negotiable?
              </label>
              {/* <input
                type="radio"
                name="discount"
                value="all"
                onChange={(e) =>
                  handleFilterChange("hasDiscount", e.target.value)
                }
                className="mr-1"
              /> */}
            </div>
          </div>
        )}
      </CounterOffer>
    </div>
  );
}

export default SingleSellerProduct;
