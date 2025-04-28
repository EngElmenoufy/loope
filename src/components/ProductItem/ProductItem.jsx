import Rating from "@mui/material/Rating";

export default function ProductItem({ data, isFixedWidth }) {
  return (
    <div role="link" className={`${isFixedWidth ? "w-48" : ""} pb-2`}>
      <div className="bg-[#f2f2f2] rounded-lg w-full h-44 mb-2">
        <img src={data.image} alt={data.title} className="w-full h-full " />
      </div>
      <div className="flex flex-col" title={data.title}>
        <span className="text-sm text-nowrap overflow-hidden text-ellipsis">
          {data.title}
        </span>
        <span className="text-lg text-[#18403C] font-medium">{data.price}</span>
        <Rating name="read-only" value={data.rate} readOnly />
      </div>
    </div>
  );
}
