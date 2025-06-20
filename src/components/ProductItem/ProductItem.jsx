import { Alert } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function ProductItem({
  data,
  isFixedWidth,
  onAddOrRemoveFavorite,
}) {
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);
  const [showMessage, setShowMessage] = useState(false);

  // const checkIsFavorite = async () => {
  //   console.log(token);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/api/favorites/check/${data._id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const productData = await response.json();
  //     if (!response.ok) throw new Error(productData.msg);
  //     setIsFavorite(productData.isFavorite);
  //     return { success: true };
  //   } catch (err) {
  //     return { success: false, error: err.message };
  //   }
  // };

  // useEffect(() => {
  //   // checkIsFavorite();
  // }, []);
  // console.log(data);

  const handleAddToFavorite = (e) => {
    e.preventDefault(); // Prevent the Link navigation
    e.stopPropagation();
    setIsFavorite((preFav) => !preFav);
    onAddOrRemoveFavorite(data._id, isFavorite);

    setShowMessage(true);

    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <Link
        to={`/product/${data._id}`}
        className={`${isFixedWidth ? "w-48" : ""} pb-2 relative group`}
      >
        <div
          className="absolute opacity-0 group-hover:opacity-100 top-1 right-1 w-9 h-9 bg-gray-100 -translate-y-2 group-hover:translate-y-0 transition-all rounded-full flex justify-center items-center z-10"
          onClick={handleAddToFavorite}
        >
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#18403c"
              className="pointer-events-none"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#18403c"
              className="pointer-events-none"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
          )}
        </div>
        <div className=" rounded-lg overflow-hidden w-full h-44 mb-2 flex justify-center">
          <img
            src={
              data.img && data?.img.length > 0
                ? data?.img[0]
                : "cards/card1.png"
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
                <div className="flex items-center gap-[2px]">
                  <span className="text-lg text-[#18403C] font-medium">
                    {(data.price * (1 - data.discount / 100)).toFixed(2)} EGP
                  </span>
                  {data.isNegotiable ? (
                    <span className="text-[#004D40] ml-4 rounded-lg text-xs bg-[#ffc020] px-1">
                      Negotiable
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-[2px]">
                  <span className="text-gray-500 line-through text-sm">
                    {data.price} EGP
                  </span>
                  <span className="text-gray-700 ml-4 rounded-lg text-xs bg-green-400 px-1">
                    {data.discount}% off
                  </span>
                </div>
              </>
            ) : (
              <div className="flex gap-[2px] items-center">
                <span className="text-lg text-[#18403C] font-medium">
                  {data.price} EGP
                </span>
                {data.isNegotiable ? (
                  <span className="text-[#004D40] ml-4 rounded-lg text-xs bg-[#ffc020] px-1">
                    Negotiable
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {data.averageRate ? (
            <div className="flex gap-3 items-center">
              <Rating name="read-only" value={data.averageRate} readOnly />
              <span className="text-xs text-gray-500">
                ({data.totalReviews})
              </span>
            </div>
          ) : (
            <Rating name="read-only" value={0} precision={0.5} readOnly />
          )}
        </div>
      </Link>
      {showMessage && (
        <Alert severity="success" className="fixed bottom-4 right-4 z-50">
          Saved to Favorites
        </Alert>
      )}
    </>
  );
}
