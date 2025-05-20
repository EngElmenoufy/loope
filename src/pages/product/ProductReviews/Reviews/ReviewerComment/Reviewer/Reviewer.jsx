function Reviewer({ userData }) {
  return (
    <div role="link" className="flex gap-4 items-center my-2 cursor-pointer">
      <img
        src={
          userData.avatar ===
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPwA="
            ? "../../../../../../../public/profile.jpg"
            : userData.avatar
        }
        alt="profile image"
        className="w-10"
      />
      <span className="block text-sm md:text-base font-semibold">
        {userData.firstName} {userData.lastName}
      </span>
    </div>
  );
}

export default Reviewer;
