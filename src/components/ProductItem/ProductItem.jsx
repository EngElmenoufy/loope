import Rating from "@mui/material/Rating";

export default function ProductItem({ data, isFixedWidth }) {
  return (
    <div role="link" className={`${isFixedWidth ? "w-48" : ""} pb-2`}>
      <div className="bg-[#f2f2f2] rounded-lg w-full h-44 mb-2">
        <img src="cards/card1.png" alt={data.name} className="w-full h-full " />
      </div>
      <div className="flex flex-col" title={data.name}>
        <span className="text-sm text-nowrap overflow-hidden text-ellipsis">
          {data.name}
        </span>
        <div className="flex flex-col mb-1">
          {data.discount ? (
            <>
              <span className="text-lg text-[#18403C] font-medium">
                {(data.price * (1 - data.discount / 100)).toFixed(2)} AED
              </span>
              <span className="text-gray-500 line-through text-sm">
                {data.price} AED
                <span className="text-gray-700 ml-4 rounded-lg text-xs bg-green-400 px-1">
                  {data.discount}% off
                </span>
              </span>
            </>
          ) : (
            <span className="text-lg text-[#18403C] font-medium">
              {data.price} AED
            </span>
          )}
        </div>

        {data.averageRate ? (
          <div className="flex gap-3 items-center">
            <Rating name="read-only" value={data.averageRate} readOnly />
            <span className="text-xs text-gray-500">({data.totalReviews})</span>
          </div>
        ) : (
          <Rating name="read-only" value="4.5" precision={0.5} readOnly />
        )}
      </div>
    </div>
  );
}
