import { useEffect, useRef, useState } from "react";
import IconButton from "../../../components/IconButton/IconButton";
import DropdownYourAccount from "./DropdownYourAccount";
import "./Navbar.css";
import DropdownNotification from "./DropdownNotification";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isDropdownAccountOpen, setIsDropdownAccountOpen] = useState(false);
  const [isDropdownNotificationOpen, setIsDropdownNotificationOpen] =
    useState(false);

  const navigate = useNavigate();

  const dropdownAccountRef = useRef(null);
  const dropdownNotificationRef = useRef(null);

  const toggleDropdownAccount = () => {
    setIsDropdownAccountOpen(!isDropdownAccountOpen);
  };

  const toggleDropdownNotification = () => {
    setIsDropdownNotificationOpen(!isDropdownNotificationOpen);
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

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="relative">
          <button
            // onClick={onClick}
            className="btn-icon icon-button"
          >
            <img
              src="icons/favorite.png"
              alt="favorite products"
              className="icon-image"
            />
            <div className="label">Favorite</div>
          </button>
        </div>

        <div className="relative" ref={dropdownAccountRef}>
          <button
            onClick={toggleDropdownAccount}
            className="btn-icon icon-button"
          >
            <img
              src="icons/account.png"
              alt="account icon"
              className="icon-image"
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
          {isDropdownAccountOpen && <DropdownYourAccount />}
        </div>

        <div className="relative">
          <button onClick={handleCartClick} className="btn-icon icon-button">
            <img
              src="icons/shopping_cart.png"
              alt="shopping icon"
              className="icon-image"
            />
            <div className="label">Cart</div>
            {/* <span className="text-white max-md:hidden">Cart</span> */}
          </button>
        </div>

        <div className="relative">
          <button
            // onClick={onClick}
            className="btn-icon icon-button"
          >
            <img
              src="icons/store.png"
              alt="store icon"
              className="icon-image"
            />
            {/* <span className="text-white max-md:hidden">Sell</span> */}
            <div className="label">Sell</div>
          </button>
        </div>

        <div className="relative" ref={dropdownNotificationRef}>
          <button
            onClick={toggleDropdownNotification}
            className="btn-icon icon-button"
          >
            <img
              src="icons/notifications.png"
              alt="notifications icon"
              className="icon-image"
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
