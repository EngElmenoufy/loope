import { useState } from "react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    follows: true,
    saves: false,
    orders: true,
    offers: false,
    soldItems: true,
    comments: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Notification Settings
      </h2>

      <div className="">
        {/* Toggle Switch Item */}
        <div className="flex items-center justify-between py-3">
          <span className="text-gray-800 font-medium">
            When someone follows me
          </span>
          <button
            className={`relative inline-flex h-[26px] w-11 items-center rounded-full ${notifications.follows ? "bg-[#C3E6C3]" : "bg-transparent border border-[#18403C]"}`}
            onClick={() => toggleNotification("follows")}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full shadow-md transition ${notifications.follows ? "bg-[#18403C] translate-x-5" : "bg-[#C3E6C3] translate-x-1"}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-gray-800 font-medium">
            When someone saves my item
          </span>
          <button
            className={`relative inline-flex h-[26px] w-11 items-center rounded-full ${notifications.saves ? "bg-[#C3E6C3]" : "bg-transparent border border-[#18403C]"}`}
            onClick={() => toggleNotification("saves")}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full shadow-md transition ${notifications.saves ? "bg-[#18403C] translate-x-5" : "bg-[#C3E6C3] translate-x-1"}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-gray-800 font-medium">
            About the status of my orders
          </span>
          <button
            className={`relative inline-flex h-[26px] w-11 items-center rounded-full ${notifications.orders ? "bg-[#C3E6C3]" : "bg-transparent border border-[#18403C]"}`}
            onClick={() => toggleNotification("orders")}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full shadow-md transition ${notifications.orders ? "bg-[#18403C] translate-x-5" : "bg-[#C3E6C3] translate-x-1"}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-gray-800 font-medium">
            When someone makes a price offer
          </span>
          <button
            className={`relative inline-flex h-[26px] w-11 items-center rounded-full ${notifications.offers ? "bg-[#C3E6C3]" : "bg-transparent border border-[#18403C]"}`}
            onClick={() => toggleNotification("offers")}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full shadow-md transition ${notifications.offers ? "bg-[#18403C] translate-x-5" : "bg-[#C3E6C3] translate-x-1"}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-gray-800 font-medium">
            About the status of my sold items
          </span>
          <button
            className={`relative inline-flex h-[26px] w-11 items-center rounded-full ${notifications.soldItems ? "bg-[#C3E6C3]" : "bg-transparent border border-[#18403C]"}`}
            onClick={() => toggleNotification("soldItems")}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full shadow-md transition ${notifications.soldItems ? "bg-[#18403C] translate-x-5" : "bg-[#C3E6C3] translate-x-1"}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-gray-800 font-medium">
            When comments are left on my items
          </span>
          <button
            className={`relative inline-flex h-[26px] w-11 items-center rounded-full ${notifications.comments ? "bg-[#C3E6C3]" : "bg-transparent border border-[#18403C]"}`}
            onClick={() => toggleNotification("comments")}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full shadow-md transition ${notifications.comments ? "bg-[#18403C] translate-x-5" : "bg-[#C3E6C3] translate-x-1"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
