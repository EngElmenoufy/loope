import Button from "../../../../components/Button/Button";
import PaymentMethod from "../../../../components/PaymentMethod/PaymentMethod";
import CardInformation from "../CardInformation/CardInformation";

function DoubleCheckOrderDetails({
  onClose,
  handleShipToClick,
  itemsCount,
  handleSubmitOrder,
  details,
  onChangeDetails,
  errorAddress,
  total,
  totalWithDiscount,
}) {
  return (
    <div className="flex flex-col">
      <div className="p-4 bg-white rounded-t-lg">
        <div className="rounded-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3>Double check your order details</h3>
            <button onClick={onClose} className="text-gray-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div
            role="button"
            className={`p-4 rounded-lg border border-gray-200 ${errorAddress ? "border-red-600" : ""} mb-4`}
            onClick={handleShipToClick}
          >
            <div className="flex items-center justify-between mb-2">
              <h4>Ship to</h4>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
            {errorAddress && (
              <div className="mb-4 bg-red-50 p-2 rounded border border-red-200">
                <p className="text-sm text-red-600">
                  You should add your details
                </p>
              </div>
            )}
            <p className="text-sm text-gray-700">
              <span className="text-base text-gray-900 font-semibold">
                City:{" "}
              </span>{" "}
              {details.shippingAddress.city}
            </p>
            <p className="text-sm text-gray-700">
              <span className="text-base text-gray-900 font-semibold">
                Street:
              </span>{" "}
              {details.shippingAddress.street}
            </p>
            <p className="text-sm text-gray-700">
              <span className="text-base text-gray-900 font-semibold">
                Flat:{" "}
              </span>{" "}
              {details.shippingAddress.flat}
            </p>
            <p className="text-sm text-gray-700">
              <span className="text-base text-gray-900 font-semibold">
                Phone:{" "}
              </span>{" "}
              {details.shippingAddress.phone}
            </p>

            {/* <div className="mt-4 flex items-center">
              <div className="w-12 h-12 bg-purple-200 rounded-md flex items-center justify-center">
                <span className="text-purple-700">📦</span>
              </div>
              <div className="ml-2 flex-1">
                <select className="w-full p-2 border rounded-md bg-white">
                  <option>USD 36.36 (Standard International)</option>
                </select>
              </div>
            </div> */}
          </div>
          <div className="p-4 rounded-lg border border-gray-200">
            <h4>Payment</h4>

            <PaymentMethod
              method={details.paymentMethod}
              onChangeMethod={onChangeDetails}
            />
            {details.paymentMethod === "card" && <CardInformation />}
          </div>
        </div>

        <div className="flex flex-col my-4">
          <div className="flex justify-between items-center pb-2">
            <span className="text-lg">Items ({itemsCount})</span>
            <span className="text-lg font-semibold">{total} EGP</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-lg">Discount</span>
            <span className="text-lg font-semibold">
              {total - totalWithDiscount} EGP
            </span>
          </div>
          <div className="flex justify-between items-center border-b py-2 mb-4">
            <span className="text-lg">Total Price</span>
            <span className="text-lg font-semibold">
              {totalWithDiscount} EGP
            </span>
          </div>
          <Button
            type="main"
            text={`Pay ${300.0} EGP`}
            otherClass="!w-full !rounded-xl !p-3"
            onClick={handleSubmitOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default DoubleCheckOrderDetails;
