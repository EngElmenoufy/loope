export default function AddedProductDetails({
  productName,
  setProductName,
  listPrice,
  setListPrice,
  stockQuantity,
  setStockQuantity,
  yourEarnings,
  isNegotiable,
  setIsNegotiable,
}) {
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="PRODUCT NAME"
          className="w-full border-b border-gray-200 bg-transparent p-2 focus:outline-none"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          maxLength={50}
        />
        <div className="flex justify-end">
          <span className="text-xs text-gray-500">{productName.length}/50</span>
        </div>
      </div>

      <div className="relative mb-4">
        <input
          type="number"
          placeholder="LIST PRICE"
          className="w-full border-b border-gray-200 bg-transparent p-2 focus:outline-none"
          value={listPrice}
          onChange={(e) => setListPrice(e.target.value)}
        />
        <span className="absolute text-lg font-semibold top-1/2 right-2 -translate-y-1/2 text-[#0B0A0A]">
          AED
        </span>
      </div>

      <div className="relative my-4">
        <input
          type="number"
          placeholder="YOUR EARNINGS"
          className="w-full border-b border-gray-200 bg-transparent p-2 focus:outline-none"
          value={yourEarnings}
          disabled
        />
        <span className="absolute text-lg font-semibold top-1/2 right-2 -translate-y-1/2 text-[#0B0A0A]">
          AED
        </span>
      </div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="STOCK QUANTITY"
          className="w-full  border-b border-gray-200 bg-transparent p-2 mt-0 focus:outline-none"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
      </div>

      <div className="flex items-center mb-4 cursor-pointer my-4">
        <input
          type="checkbox"
          id="isNegotiable"
          className="mr-2 cursor-pointer"
          value={isNegotiable}
          onClick={() => setIsNegotiable((isNegotiable) => !isNegotiable)}
        />
        <label htmlFor="isNegotiable" className="cursor-pointer">
          Is price negotiable?
        </label>
      </div>
    </div>
  );
}
