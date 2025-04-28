import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Navbar from "./Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const icon = { src: "icons/menu.png", alt: "menu icon", label: "Category" };

  const categories = [
    "Mobiles, Tablets & Accessories",
    "Computers & Office Supplies",
    "TVs & Electronics",
    "Women's Fashion",
    "Men's Fashion",
    "Kids Fashion",
    "Health, Beauty & Perfumes",
    "Supermarket",
  ];

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
        {/* <button
          onClick={toggleDrawer(true)}
          className="btn flex items-center gap-2 w-fit h-fit"
        >
          <img src="icons/menu.png" alt="menu icon" className={"w-6 h-6"} />
          <span className="text-white max-lg:hidden">Category</span>
        </button> */}
        <IconButton
          icon={icon}
          disable={false}
          isRounded={false}
          onClick={toggleDrawer(true)}
        />
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div className="w-80 max-sm:w-screen">
            <div className="flex justify-between items-center pl-7 pr-3 py-3 mb-2">
              <h3 className="text-2xl font-bold text-[#18403C] ">Categories</h3>
              <buton onClick={toggleDrawer(false)} className="cursor-pointer">
                <img src="icons/close.png" alt="Close drawer" className="w-6" />
              </buton>
            </div>
            <ul>
              {categories.map((category) => (
                <li
                  className="py-2 pl-7 pr-3 hover:bg-[#eaeded] hover:cursor-pointer"
                  key={category}
                >
                  <a className="flex justify-between items-center">
                    <span>{category}</span>
                    <img
                      src="icons/arrow-right.png"
                      alt="arrow right"
                      className="w-7 h-7"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Drawer>

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
    </header>
  );
}

// import { useState, useEffect, useRef } from "react";
// import {
//   User,
//   Search,
//   Heart,
//   Gift,
//   ShoppingCart,
//   MessageSquare,
//   Tag,
//   Menu,
//   Settings,
//   LogOut,
// } from "lucide-react";

// export default function EtsyNavbar() {
// const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// const dropdownRef = useRef(null);

// const toggleDropdown = () => {
//   setIsDropdownOpen(!isDropdownOpen);
// };

//   // Close dropdown when clicking outside
// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsDropdownOpen(false);
//     }
//   };

//   if (isDropdownOpen) {
//     document.addEventListener("mousedown", handleClickOutside);
//   }

//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, [isDropdownOpen]);

//   return (
//     <div className="font-sans">
//       {/* Main Navigation Bar - fixed position to stay on top */}
//       <div className="bg-white shadow-md relative z-30">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center">
//               <div className="text-orange-500 font-bold text-3xl">Etsy</div>
//               <button className="ml-4 text-gray-700">
//                 <Menu size={20} />
//                 <span className="ml-2">Categories</span>
//               </button>
//             </div>

//             {/* Search Bar */}
//             <div className="relative flex-grow max-w-2xl mx-6">
//               <input
//                 type="text"
//                 placeholder="Search for anything"
//                 className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <button className="absolute right-0 top-0 bg-orange-500 rounded-full p-2 mt-0.5 mr-0.5">
//                 <Search size={20} color="white" />
//               </button>
//             </div>

//             {/* Right Navigation Icons */}
//             <div className="flex items-center space-x-4">
//               <button>
//                 <Heart size={24} />
//               </button>
//               <button>
//                 <Gift size={24} />
//               </button>
//               <button>
//                 <ShoppingCart size={24} />
//               </button>
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full"
//                   onClick={toggleDropdown}
//                 >
//                   <User size={20} />
//                 </button>

//                 {/* Profile Dropdown */}
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 top-12 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
//                     <div className="p-4 border-b border-gray-200">
//                       <div className="flex items-center">
//                         <div className="rounded-full bg-gray-200 p-2 mr-3">
//                           <User size={20} />
//                         </div>
//                         <div>
//                           <div className="font-semibold">mahmoud Elmenoufy</div>
//                           <div className="text-sm text-gray-600">
//                             View your profile
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="py-2">
//                       <button className="flex items-center w-full px-4 py-3 hover:bg-gray-100">
//                         <Gift size={18} className="mr-3" />
//                         <span>Purchases and reviews</span>
//                       </button>
//                       <button className="flex items-center w-full px-4 py-3 hover:bg-gray-100">
//                         <MessageSquare size={18} className="mr-3" />
//                         <span>Messages</span>
//                       </button>
//                       <button className="flex items-center w-full px-4 py-3 hover:bg-gray-100">
//                         <Tag size={18} className="mr-3" />
//                         <span>Special offers</span>
//                       </button>
//                       <button className="flex items-center w-full px-4 py-3 hover:bg-gray-100">
//                         <Gift size={18} className="mr-3" />
//                         <span>Etsy Registry</span>
//                       </button>
//                     </div>

//                     <div className="border-t border-gray-200 py-2">
//                       <button className="flex items-center w-full px-4 py-3 hover:bg-gray-100">
//                         <Settings size={18} className="mr-3" />
//                         <span>Account settings</span>
//                       </button>
//                       <button className="flex items-center w-full px-4 py-3 hover:bg-gray-100">
//                         <LogOut size={18} className="mr-3" />
//                         <span>Sign out</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Secondary Navigation */}
//       <div className="bg-white border-t border-gray-200 relative z-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex space-x-6 py-2">
//             <button className="flex items-center px-2">
//               <Gift size={16} className="mr-1" />
//               <span>Gifts</span>
//             </button>
//             <button className="px-2">Mother's Day Gifts</button>
//             <button className="px-2">Home Favorites</button>
//             <button className="px-2">Fashion Finds</button>
//             <button className="px-2">Registry</button>
//           </div>
//         </div>
//       </div>

//       {/* Page Content */}
//       <div className="relative z-10">
//         {/* Sample content area */}
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="grid grid-cols-2 gap-8">
//             <div className="bg-pink-100 rounded-lg p-8">
//               <h2 className="text-4xl mb-4">Mother's Day magic</h2>
//               <p className="mb-6">Affordable gifts for every kind of Mom</p>
//               <button className="bg-gray-800 text-white px-6 py-2 rounded-full">
//                 Perfect presents
//               </button>
//             </div>
//             <div className="bg-yellow-50 rounded-lg p-8">
//               <h2 className="text-4xl mb-4">Book Lovers Sales</h2>
//               <p className="mb-6">Shop Now</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Overlay that appears behind the dropdown but covers the content */}
//       {isDropdownOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 z-10"
//           onClick={() => setIsDropdownOpen(false)}
//         />
//       )}
//     </div>
//   );
// }
