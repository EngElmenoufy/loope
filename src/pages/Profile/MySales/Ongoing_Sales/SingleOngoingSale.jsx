import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportModal from "./ReportModal";

function SingleOngoingSale({
  date,
  address,
  order,
  paymentMethod,
  setShowSuccessReport,
}) {
  const [productData, setProductData] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [sellerId, setSellerId] = useState("");
  const [trackOrder, setTrackOrder] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [hideReport, setHideReport] = useState(false);
  const handleTracking = () => {
    setTrackOrder(!trackOrder);
  };
  const handleRporting = () => {
    setIsReportOpen(!isReportOpen);
  };

  function getDateAfter7Days() {
    const oldDate = new Date(date);
    oldDate.setDate(oldDate.getDate() + 7);
    return oldDate;
  }

  const dateAfter7Days = getDateAfter7Days();

  const getProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${order.productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.data) {
        setProductData(data.data);
        setSellerId(data.data.sellerId);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSellerData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${sellerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.data) {
        setSellerData(data.data);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    if (sellerId) {
      getSellerData();
    }
  }, [sellerId]);

  // const statusHistory = [
  //   {
  //     status: "ordered",
  //     date: "18 March 2025, 8:38 PM",
  //     completed: true,
  //   },
  //   {
  //     status: "shipped",
  //     date: "20 March 2025",
  //     completed: false,
  //   },
  //   {
  //     status: "dispatched",
  //     date: "20 March 2025",
  //     completed: false,
  //   },
  //   {
  //     status: "on the way",
  //     date: "21 March 2025",
  //     completed: false,
  //   },
  //   {
  //     status: "delivered",
  //     date: "21 March 2025",
  //     completed: false,
  //   },
  // ];

  const generateStatusHistory = (orderDateStr) => {
    const baseDate = new Date(orderDateStr);
    const now = new Date();

    const statuses = [
      { status: "ordered", offsetDays: 0 },
      { status: "shipped", offsetDays: 2 },
      { status: "dispatched", offsetDays: 4 },
      { status: "on the way", offsetDays: 6 },
      { status: "delivered", offsetDays: 7 },
    ];

    return statuses.map(({ status, offsetDays }) => {
      const statusDate = new Date(baseDate);
      statusDate.setDate(baseDate.getDate() + offsetDays);

      return {
        status,
        date: statusDate.toLocaleString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        completed: statusDate <= now,
      };
    });
  };

  const statusHistory = generateStatusHistory(date);

  return (
    <div className="card rounded-md mb-10">
      <Link
        to={`/profile/${sellerData._id}`}
        className="flex items-center gap-1 w-fit cursor-pointer mb-4"
      >
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
          <img
            src={
              sellerData.avatar ===
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPwA="
                ? "profile.jpg"
                : sellerData.avatar
            }
            alt="user avatar"
            className="rounded-full"
          />
        </div>
        <h2 className="text-xl font-bold">
          {sellerData?.firstName} {sellerData?.lastName}
        </h2>
      </Link>

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={productData?.img ? productData.img[0] : null}
            alt={productData?.name}
            className="rounded-md object-contain max-h-64"
          />
        </div>

        <div className="flex-1">
          <Link
            to={`/product/${order.productId}`}
            className="text-xl font-bold mb-2 hover:underline text-nowrap overflow-hidden text-ellipsis"
          >
            {productData?.name}
          </Link>
          <p className="text-gray-700 mb-4">{productData?.description}</p>

          <div className="space-y-1 mb-4 text-xl">
            {/* <p>
              <span className="font-bold">Order ID:</span>{" "}
              <span>{order.orderId}</span>{" "}
            </p> */}
            <p>
              <span className="font-bold">Order Date:</span>{" "}
              <span>{new Date(date).toDateString()}</span>{" "}
            </p>
            {/* <p>
              <span className="font-bold">Transaction ID:</span>{" "}
              <span>{order.transactionId}</span>{" "}
            </p> */}
            <p>
              <span className="font-bold">Payment:</span>{" "}
              <span>{paymentMethod}</span>{" "}
            </p>
            <p>
              {" "}
              <span className="text-[#020817] text-lg font-bold">
                Price: {order.price} EGP
              </span>
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="font-medium text-lg">
                {" "}
                <span className="font-bold">SHIPPING ADDRESS:</span>{" "}
                <span>
                  {address.street} {address.city}
                </span>
              </p>
            </div>
            <div>
              <p className="font-medium">
                {" "}
                <span className="font-bold">ESTIMATED DELIVERY:</span>{" "}
                {dateAfter7Days.toDateString()}
              </p>
            </div>
          </div>
          {trackOrder == false ? (
            <button
              className="bg-primary-green text-white inline-block p-2 rounded-md hover:bg-[#174e47]"
              onClick={handleTracking}
            >
              Track Order
            </button>
          ) : (
            <button
              className="bg-red-700 text-white inline-block p-2 rounded-md hover:bg-red-600"
              onClick={handleTracking}
            >
              Exit
            </button>
          )}
        </div>
      </div>
      {trackOrder === true && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Status</h3>

          <div className="relative mt-10">
            {/* Status line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>

            {/* Status points */}
            <div className="flex justify-between relative z-10">
              {statusHistory.map((status, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center mb-2
                      ${status.completed ? "bg-primary-green border-primary-green" : "bg-white border-gray-300"}`}
                  >
                    {status.completed && (
                      <svg
                        className="h-5 w-5 text-white"
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
                    )}
                  </div>
                  <p className="capitalize font-medium text-center">
                    {status.status}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    {status.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {!hideReport ? (
            <div className="mt-10">
              <button
                className={`bg-primary-green text-white w-full md:w-auto inline-block py-2 px-3 rounded-md hover:bg-[#174e47]`}
                onClick={handleRporting}
              >
                REPORT AN ISSUE
              </button>
            </div>
          ) : null}
        </div>
      )}

      <ReportModal
        isOpen={isReportOpen}
        setShowSuccessReport={setShowSuccessReport}
        onClose={() => setIsReportOpen(false)}
        setHideReport={setHideReport}
      >
        <h2 className="text-xl font-semibold mb-4">Report the order:</h2>
      </ReportModal>
    </div>
  );
}

export default SingleOngoingSale;
