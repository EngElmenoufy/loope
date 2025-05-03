import { useRef, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Navbar from "./Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import { useNavigate } from "react-router-dom";
import DropdownCategories from "./DropdownCategories";

export default function Header() {
  const [isDropdownCategoriesOpen, setIsDropdownCategoriesOpen] =
    useState(false);
  const navigate = useNavigate();

  const dropdownCategoriesRef = useRef(null);

  const toggleDropdownCategories = () => {
    setIsDropdownCategoriesOpen(!isDropdownCategoriesOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="p-3 relative z-30 flex justify-between items-center max-lg:flex-wrap bg-[#18403C] mb-4">
      <h1
        className="text-3xl font-medium text-white hover:cursor-pointer"
        onClick={handleLogoClick}
      >
        <a>Loope</a>
      </h1>
      <div className="flex items-center gap-5 max-lg:order-2 max-lg:mt-2 max-lg:w-full lg:flex-1 mx-7">
        <div className="relative" ref={dropdownCategoriesRef}>
          <button
            onClick={toggleDropdownCategories}
            className="btn-icon icon-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
            <div className="text-white">Categories</div>
          </button>
          {isDropdownCategoriesOpen && <DropdownCategories />}
        </div>

        <div className="w-full relative">
          <input
            type="search"
            placeholder="Search"
            className=" px-6 py-2 rounded-full w-full border  focus:outline-none"
          />
          <button className="absolute right-2 flex justify-center items-center bg-[#F3F637] !w-8 !h-8 rounded-full top-1/2 translate-y-[-50%]">
            <img
              src="icons/search.png"
              alt="search icon"
              className={"w-6 h-6"}
            />
          </button>
        </div>
      </div>
      <Navbar />
      {isDropdownCategoriesOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 -z-10"
          onClick={() => setIsDropdownCategoriesOpen(false)}
        />
      )}
    </header>
  );
}
