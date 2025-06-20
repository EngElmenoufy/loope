import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OngoingSales from "./Ongoing_Sales/OngoingSales";
import PastSales from "./Past_Sales/PastSales";

function MySalesPage({ token, user }) {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [orders, setOrders] = useState([]);
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  const getMyOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/order${user.role === "seller" ? "/seller" : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);
      setOrders(data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const separateOrder = () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recent = [];
    const old = [];

    orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      if (orderDate > sevenDaysAgo) {
        recent.push(order);
      } else {
        old.push(order);
      }
    });

    setOngoingOrders(recent);
    setPastOrders(old);
  };

  useEffect(() => {
    separateOrder();
  }, [orders]);

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              My {user.role === "seller" ? "Sales" : "Purchases"}
            </h1>
          </div>
          <div className="flex rounded-md overflow-hidden">
            <button
              className={`px-8 py-2 ${activeTab === "ongoing" ? `bg-primary-green text-white` : "bg-gray-100"}`}
              onClick={() => setActiveTab("ongoing")}
            >
              ONGOING
            </button>
            <button
              className={`px-8 py-2 ${activeTab === "past" ? "bg-primary-green text-white" : "bg-gray-100"}`}
              onClick={() => setActiveTab("past")}
            >
              PAST
            </button>
          </div>
        </div>

        {activeTab == "ongoing" && (
          <OngoingSales
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            orders={ongoingOrders}
            user={user}
          />
        )}
        {activeTab == "past" && (
          <PastSales
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            orders={pastOrders}
            user={user}
          />
        )}
      </main>
    </div>
  );
}

export default MySalesPage;
