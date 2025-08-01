import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Ongoing_Sales/OngoingSales.css";
import SinglePastSale from "./SinglePastSale";
import NoSales from "../NoSales";
import OrderProducts from "../Ongoing_Sales/OrderProducts";
import { ShoppingCart } from "lucide-react";
import Button from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const PastSales = ({ activeTab, setActiveTab, orders, user }) => {
  const [isEmpty, setIsEmpty] = useState(false);

  const navigate = useNavigate();
  const handleToContinueShopping = () => {
    navigate("/products");
  };

  const handleToFavorite = () => {
    navigate("/saved-items");
  };
  useEffect(() => {
    setTimeout(() => {
      setIsEmpty(true);
    }, 1000);
  });

  return (
    <>
      <div className="grid [grid-template-rows:repeat(auto-fit,_minmax(min-content,_1fr))] gap-10">
        {orders.length !== 0 ? (
          orders.map((order) => <OrderProducts order={order} />)
        ) : (
          <>
            {isEmpty && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-gray-100 rounded-full p-8 mb-6">
                  <ShoppingCart className="w-16 h-16 text-gray-400" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Your past {user.role === "seller" ? "sales" : "purchases"} is
                  empty
                </h2>
                <p className="text-gray-600 text-center mb-8 max-w-md">
                  Looks like you haven't added anything to your past{" "}
                  {user.role === "seller" ? "Sales" : "Purchases"} yet. Start
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
          </>
        )}
      </div>
    </>
  );
};

export default PastSales;
