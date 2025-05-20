function SellerDetails({ sellerData }) {
  // console.log(sellerData);

  console.log(sellerData);

  return (
    <div role="link" className="flex items-center gap-4 w-fit">
      <img
        src="man.jpg"
        alt="seller image"
        className="rounded-full w-10 h-10"
      />
      <div>
        <span className="block text-lg font-semibold">
          {sellerData?.firstName} {sellerData?.lastName}
        </span>
      </div>
    </div>
  );
}

export default SellerDetails;
