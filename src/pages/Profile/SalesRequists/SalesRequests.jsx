import ApprovedSalesRequests from "./Approved/ApprovedSalesRequests";
import PendingSalesRequests from "./Pending/PendingSalesRequests";
import RejectedSalesRequests from "./Rejected/RejectedSalesRequests";
import CounteredSalesRequests from "./Countered/CounteredSalesRequests";
import React, { useState, useEffect } from "react";

function SalesRequests({ token, user }) {
  const [activeTab, setActiveTab] = useState("pending");
  const [myRequests, setMyRequests] = useState([]);

  const getMyRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/negotiation/history/${activeTab}`,
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
      setMyRequests(data.data.negotiations);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setMyRequests([]);
    getMyRequests();
  }, [activeTab]);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {user.role === "seller" ? "SALES" : "PURCHASES"} REQUESTS
          </h1>
        </div>

        <div className="mb-6 border-b">
          <div className="flex">
            <button
              className={`px-6 py-2 font-medium ${activeTab === "pending" ? "border-b-2 border-primary-green text-primary-green" : "text-gray-600"}`}
              onClick={() => setActiveTab("pending")}
            >
              PENDING
            </button>
            <button
              className={`px-6 py-2 font-medium ${activeTab === "accepted" ? "border-b-2 border-primary-green text-primary-green" : "text-gray-600"}`}
              onClick={() => setActiveTab("accepted")}
            >
              ACCEPTED
            </button>
            <button
              className={`px-6 py-2 font-medium ${activeTab === "countered" ? "border-b-2 border-primary-green text-primary-green" : "text-gray-600"}`}
              onClick={() => setActiveTab("countered")}
            >
              COUNTERED
            </button>
            <button
              className={`px-6 py-2 font-medium ${activeTab === "rejected" ? "border-b-2 border-primary-green text-primary-green" : "text-gray-600"}`}
              onClick={() => setActiveTab("rejected")}
            >
              REJECTED
            </button>
          </div>
        </div>

        {activeTab == "pending" ? (
          <PendingSalesRequests
            isSeller={user.role === "seller"}
            requests={myRequests}
            getMyRequests={getMyRequests}
            user={user}
          />
        ) : (
          ""
        )}
        {activeTab == "accepted" ? (
          <ApprovedSalesRequests
            isSeller={user.role === "seller"}
            requests={myRequests}
            user={user}
          />
        ) : (
          ""
        )}
        {activeTab == "countered" ? (
          <CounteredSalesRequests
            isSeller={user.role === "seller"}
            requests={myRequests}
            user={user}
          />
        ) : (
          ""
        )}
        {activeTab == "rejected" ? (
          <RejectedSalesRequests
            isSeller={user.role === "seller"}
            requests={myRequests}
            user={user}
          />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default SalesRequests;
