import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useState } from "react";

function CartItem({ item, onUpdate, onRemove }) {
  const itemData = item.productId;

  const [quantity, setQuantity] = useState(item.quantity);

  const price = Number(item.price) * Number(item.quantity);

  // const quantityOptions = [];

  const quantityOptions = Array.from(
    { length: itemData.stock_quantity },
    (_, i) => (i + 1).toString()
  );

  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    setQuantity(value);
    // console.log(value);
    onUpdate(itemData._id, value);
  };

  return (
    <div className="bg-white shadow-md flex gap-4 p-4 rounded-md">
      <div className="w-24">
        <img src="cards/card1.png" alt="" />
      </div>
      <div className="flex-1 px-2">
        <div className={`w-full flex justify-between items-center`}>
          <div>
            {/* <h4>Product name</h4> */}
            {/* <span className="block text-lg font-semibold">Product Name</span> */}
            <Link
              to="/product"
              className="text-black text-lg font-semibold hover:underline"
            >
              {itemData.name}
            </Link>
            {itemData.isNegotiable ? (
              <>
                <p className="text-xl font-bold text-[#17403B]">{price} AED</p>
                <p className="font-semibold text-gray-400 line-through">
                  250 AED
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-[#17403B]">200 AED</p>
            )}
          </div>
          <button
            className="btn-icon icon-button hover:!bg-[#bdd8c6d4]"
            onClick={() => onRemove(itemData._id)}
          >
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
        </div>
        <div className="flex gap-4 justify-between items-center my-2">
          <select
            name="quantity"
            className="mt-1 cursor-pointer w-fit px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={quantity}
            onChange={handleChangeQuantity}
          >
            {quantityOptions.map((quan) => (
              <option key={quan} value={quan}>
                {quan}
              </option>
            ))}
          </select>
          <Button text="Make Offer" otherClass="!w-fit !px-2 !py-2" />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
