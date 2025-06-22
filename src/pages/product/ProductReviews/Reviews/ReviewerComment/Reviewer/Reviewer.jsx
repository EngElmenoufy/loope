import { Link } from "react-router-dom";

function Reviewer({ userData }) {
  return (
    <Link
      to={`/profile/${userData._id}`}
      className="flex gap-4 items-center w-fit my-2 cursor-pointer"
    >
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
    </Link>
  );
}

export default Reviewer;
