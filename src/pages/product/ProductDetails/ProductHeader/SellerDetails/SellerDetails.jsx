function SellerDetails() {
  return (
    <div role="link" className="flex items-center gap-4 w-fit">
      <img
        src="man.jpg"
        alt="seller image"
        className="rounded-full w-10 h-10"
      />
      <div>
        <span className="block text-lg font-semibold">Seller name</span>
        <p className="text-sm">Dubai, United Arab Emirates</p>
        {/* <div className="flex gap-4">
          <a>seller items</a>
          <a>contact seller</a>
        </div> */}
      </div>
    </div>
  );
}

export default SellerDetails;
