import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";

export default function ProductItem({ data, isFixedWidth }) {
  const navigate = useNavigate();

  const handleProduct = () => {};

  return (
    <Link
      to={`/product/${data._id}`}
      className={`${isFixedWidth ? "w-48" : ""} pb-2`}
    >
      <div className=" rounded-lg overflow-hidden w-full h-44 mb-2 flex justify-center">
        <img
          src={
            data.img && data?.img.length > 0 ? data?.img[0] : "cards/card1.png"
          }
          alt={data.name}
          className="h-full object-cover object-center rounded-t-lg"
        />
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
          <Rating name="read-only" value={0} precision={0.5} readOnly />
        )}
      </div>
    </Link>
  );
}
