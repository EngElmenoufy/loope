import Button from "../../../components/Button/Button";

function CartItem({ isNegotiable = false }) {
  return (
    <div className=" flex gap-4 p-2 mt-4 rounded-lg border border-gray-300">
      <div className="w-20">
        <img src="cards/card1.png" alt="" />
      </div>
      <div
        className={`w-full px-2 ${isNegotiable ? "flex justify-between items-center" : ""}`}
      >
        <div>
          {/* <h4>Product name</h4> */}
          <span className="block text-lg font-semibold">Product Name</span>
          {isNegotiable ? (
            <>
              <p className="font-semibold text-gray-700">Initial: 250 AED</p>
              <p className="font-semibold text-gray-700">Negotiated: 200 AED</p>
            </>
          ) : (
            <p className="font-semibold text-gray-700">Price: 100 AED</p>
          )}
        </div>
        <div
          className={`${!isNegotiable ? " w-full flex justify-between gap-4 items-center mt-2" : ""}`}
        >
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#18403c"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
          {!isNegotiable && (
            <Button text="Make Offer" otherClass="!w-fit !px-2 !py-2" />
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
