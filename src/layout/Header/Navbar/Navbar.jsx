import { useEffect, useRef, useState } from "react";
import IconButton from "../../../components/IconButton/IconButton";
import DropdownYourAccount from "./DropdownYourAccount";
import "./Navbar.css";
import DropdownNotification from "./DropdownNotification";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout, cartItemCount }) {
  const [isDropdownAccountOpen, setIsDropdownAccountOpen] = useState(false);
  const [isDropdownNotificationOpen, setIsDropdownNotificationOpen] =
    useState(false);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const dropdownAccountRef = useRef(null);
  const dropdownNotificationRef = useRef(null);

  const toggleDropdownAccount = () => {
    setIsDropdownAccountOpen(!isDropdownAccountOpen);
  };

  const toggleDropdownNotification = () => {
    setIsDropdownNotificationOpen(!isDropdownNotificationOpen);
  };

  const handleCloseDropdownAccount = () => {
    setIsDropdownAccountOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownAccountRef.current &&
        !dropdownAccountRef.current.contains(event.target)
      ) {
        setIsDropdownAccountOpen(false);
      }
    };

    if (isDropdownAccountOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownAccountOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownNotificationRef.current &&
        !dropdownNotificationRef.current.contains(event.target)
      ) {
        setIsDropdownNotificationOpen(false);
      }
    };

    if (isDropdownNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownNotificationOpen]);

  // useEffect(() => {
  //   console.log(user);
  //   if (user?.avatar) {
  //     setPreview(URL.createObjectURL(user.avatar));
  //   } else {
  //     setPreview("profile-image.avif");
  //   }
  // }, [user]);

  const handleCartClick = () => {
    navigate("/cart");
  };

  console.log(user);

  return (
    <>
      <nav className="nav-bar">
        <div className="relative">
          <Link to='/saved-items' className="btn-icon icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
            </svg>
            <div className="label">Favorite</div>
          </Link>
        </div>

        <div className="relative" ref={dropdownAccountRef}>
          {user ? (
            <>
              <button
                onClick={toggleDropdownAccount}
                className="btn-icon icon-button"
              >
                <img
                  src={
                    user.avatar ===
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPwA="
                      ? "profile.jpg"
                      : user.avatar
                  }
                  alt="user avatar"
                  className="w-6 h-6 rounded-full"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M480-360 280-560h400L480-360Z" />
                </svg>
                <div className="label w-36">Your account</div>
                {/* <span className="text-white max-md:hidden">Login</span> */}
              </button>
              {isDropdownAccountOpen && (
                <DropdownYourAccount
                  user={user}
                  onLogout={onLogout}
                  onClose={handleCloseDropdownAccount}
                />
              )}
            </>
          ) : (
            <Link to="/register" className="btn-icon icon-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
              <div className="label w-fit">Register</div>
            </Link>
          )}
        </div>

        <div className="relative">
          <button onClick={handleCartClick} className="btn-icon icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM208-800h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Z" />
            </svg>
            <div className="label">Cart</div>
            {/* <span className="text-white max-md:hidden">Cart</span> */}
          </button>
        </div>

        {/* <div className="relative">
          <button className="btn-icon icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13Z" />
            </svg>
            <div className="label">Sell</div>
          </button>
        </div> */}

        <div className="relative" ref={dropdownNotificationRef}>
          <button
            onClick={toggleDropdownNotification}
            className="btn-icon icon-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M480-360 280-560h400L480-360Z" />
            </svg>
            <div className="label right-0">Notifications</div>
          </button>
          {isDropdownNotificationOpen && <DropdownNotification />}
        </div>
      </nav>
      {isDropdownAccountOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 -z-10"
          onClick={() => setIsDropdownAccountOpen(false)}
        />
      )}
      {isDropdownNotificationOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 -z-10"
          onClick={() => setIsDropdownAccountOpen(false)}
        />
      )}
    </>
  );
}
