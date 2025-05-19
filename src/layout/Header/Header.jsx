import { useEffect, useRef, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Navbar from "./Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import { useNavigate } from "react-router-dom";
import DropdownCategories from "./DropdownCategories";
import { Search } from "lucide-react";

export default function Header({ user, onLogout, cartItemCount, categories }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeoutRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout to debounce search
    searchTimeoutRef.current = setTimeout(() => {
      if (value.length > 3) {
        performSearch(value);
      } else {
        setSearchResults([]);
        setIsSearchActive(false);
      }
    }, 300);
  };

  // Perform search API call
  const performSearch = async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/search?name=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Remove duplicates based on product name
      const uniqueProducts = data.data.reduce((acc, product) => {
        if (!acc.find((item) => item.name === product.name)) {
          acc.push(product);
        }
        return acc;
      }, []);

      setSearchResults(uniqueProducts);
      setIsSearchActive(true);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
      setIsSearchActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle product click
  const handleProductClick = (productName) => {
    // In a real app, you'd use react-router or Next.js router
    // For now, we'll use window.location
    window.location.href = `/products?name=${encodeURIComponent(productName)}`;
  };

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isDropdownCategoriesOpen, setIsDropdownCategoriesOpen] =
    useState(false);
  const navigate = useNavigate();

  const dropdownCategoriesRef = useRef(null);

  const toggleDropdownCategories = () => {
    setIsDropdownCategoriesOpen(!isDropdownCategoriesOpen);
  };

  const onClose = () => {
    setIsDropdownCategoriesOpen(false);
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
      <div className="flex items-center gap-3 md:gap-5 max-lg:order-2 max-lg:mt-2 max-lg:w-full lg:flex-1 lg:mx-7">
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
            <div className="text-white max-md:hidden">Categories</div>
          </button>
          {isDropdownCategoriesOpen && (
            <DropdownCategories categories={categories} onClose={onClose} />
          )}
        </div>

        <div className="flex-1 mx-4 relative" ref={searchContainerRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            {isLoading && (
              <div className="absolute right-3 top-2.5">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
              </div>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchActive && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
              {error ? (
                <div className="p-4 text-red-600">Error: {error}</div>
              ) : searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product.name)}
                      className="flex gap-3 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <Search className="text-gray-400" size={20} />
                      <p className="font-semibold text-gray-900 tracking-wide">
                        {product.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : searchQuery.length > 3 ? (
                <div className="p-4 text-gray-600">No products found</div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <Navbar user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      {isDropdownCategoriesOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 -z-10"
          onClick={() => setIsDropdownCategoriesOpen(false)}
        />
      )}
    </header>
  );
}
