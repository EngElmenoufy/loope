function Reviewer() {
  return (
    <div role="link" className="flex gap-4 items-center my-2 cursor-pointer">
      <img src="profile-image.avif" alt="profile image" className="w-10" />
      <span className="block text-sm md:text-base font-semibold">
        Reviewer name
      </span>
    </div>
  );
}

export default Reviewer;
