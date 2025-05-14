import { useEffect, useState } from "react";
import Header from "../../layout/Header/Header";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./CategoryPage.css";
// import CategoryFilter from "./CategoryFilter";
import { useParams, useSearchParams } from "react-router-dom";

function CategoryPage({ categories, brands, products }) {
  const { id: categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("filter");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    hasDiscount: "all",
    rating: "all",
    condition: "all",
    negotiable: "all",
    priceMin: "",
    priceMax: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    category: "",
    brand: "",
    hasDiscount: "all",
    rating: "all",
    condition: "all",
    negotiable: "all",
    priceMin: "",
    priceMax: "",
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Rating options
  const ratingOptions = [
    { value: "all", label: "All Ratings" },
    { value: "4.5", label: "4.5 & Up" },
    { value: "4", label: "4 & Up" },
    { value: "3.5", label: "3.5 & Up" },
    { value: "3", label: "3 & Up" },
  ];

  // Condition options
  const conditionOptions = [
    { value: "all", label: "All Conditions" },
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
  ];

  // Initialize products on component mount
  useEffect(() => {
    console.log(products);
    setFilteredProducts(products);
  }, []);

  // Close filter when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterOpen && window.innerWidth < 768) {
        const filterElement = document.getElementById("mobile-filter");
        if (filterElement && !filterElement.contains(event.target)) {
          setIsFilterOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
    }));
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    filterProducts(filters);
    setIsFilterOpen(false);
  };

  const filterProducts = (currentFilters) => {
    let filtered = products.filter((product) => {
      // Category filter
      if (
        currentFilters.category &&
        product.category !== currentFilters.category
      ) {
        return false;
      }

      // Brand filter
      if (currentFilters.brand && product.brand !== currentFilters.brand) {
        return false;
      }

      // Discount filter (now checking for any discount > 0)
      if (currentFilters.hasDiscount !== "all") {
        if (currentFilters.hasDiscount === "yes" && product.discount <= 0) {
          return false;
        }
        if (currentFilters.hasDiscount === "no" && product.discount > 0) {
          return false;
        }
      }

      // Rating filter
      if (currentFilters.rating !== "all") {
        const minRating = parseFloat(currentFilters.rating);
        if (product.averageRate < minRating) {
          return false;
        }
      }

      // Condition filter
      if (
        currentFilters.condition !== "all" &&
        product.condition !== currentFilters.condition
      ) {
        return false;
      }

      // Negotiable filter
      if (currentFilters.negotiable !== "all") {
        if (currentFilters.negotiable === "yes" && !product.isNegotiable) {
          return false;
        }
        if (currentFilters.negotiable === "no" && product.isNegotiable) {
          return false;
        }
      }

      // Price range filter
      if (
        currentFilters.priceMin &&
        product.price < Number(currentFilters.priceMin)
      ) {
        return false;
      }
      if (
        currentFilters.priceMax &&
        product.price > Number(currentFilters.priceMax)
      ) {
        return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      brand: "",
      hasDiscount: "all",
      rating: "all",
      condition: "all",
      negotiable: "all",
      priceMin: "",
      priceMax: "",
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setFilteredProducts(products);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (appliedFilters.category) count++;
    if (appliedFilters.brand) count++;
    if (appliedFilters.hasDiscount !== "all") count++;
    if (appliedFilters.rating !== "all") count++;
    if (appliedFilters.condition !== "all") count++;
    if (appliedFilters.negotiable !== "all") count++;
    if (appliedFilters.priceMin || appliedFilters.priceMax) count++;
    return count;
  };

  const hasUnappliedChanges = () => {
    return JSON.stringify(filters) !== JSON.stringify(appliedFilters);
  };

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  // Helper function to get brand name by ID
  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b._id === brandId);
    return brand ? brand.name : "Unknown Brand";
  };

  // Render star rating
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div>
      <main className="category grid grid-cols-12 gap-4 m-4">
        <div className="relative">
          {/* Mobile Filter Button */}
          <div className="md:hidden fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
          </div>

          {/* Desktop and Mobile Layout */}
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block p-4 h-fit sticky top-4">
            {/* Filter Header */}
            <div className="flex items-center space-x-2 mb-4">
              <svg
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </div>

            {/* Filter Content */}
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Discount Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Has Discount
                </label>
                <div className="flex space-x-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discount"
                      value="all"
                      checked={filters.hasDiscount === "all"}
                      onChange={(e) =>
                        handleFilterChange("hasDiscount", e.target.value)
                      }
                      className="mr-1"
                    />
                    <span className="text-sm">All</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discount"
                      value="yes"
                      checked={filters.hasDiscount === "yes"}
                      onChange={(e) =>
                        handleFilterChange("hasDiscount", e.target.value)
                      }
                      className="mr-1"
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discount"
                      value="no"
                      checked={filters.hasDiscount === "no"}
                      onChange={(e) =>
                        handleFilterChange("hasDiscount", e.target.value)
                      }
                      className="mr-1"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {ratingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  value={filters.condition}
                  onChange={(e) =>
                    handleFilterChange("condition", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {conditionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Negotiable Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Negotiable
                </label>
                <div className="flex space-x-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="negotiable"
                      value="all"
                      checked={filters.negotiable === "all"}
                      onChange={(e) =>
                        handleFilterChange("negotiable", e.target.value)
                      }
                      className="mr-1"
                    />
                    <span className="text-sm">All</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="negotiable"
                      value="yes"
                      checked={filters.negotiable === "yes"}
                      onChange={(e) =>
                        handleFilterChange("negotiable", e.target.value)
                      }
                      className="mr-1"
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="negotiable"
                      value="no"
                      checked={filters.negotiable === "no"}
                      onChange={(e) =>
                        handleFilterChange("negotiable", e.target.value)
                      }
                      className="mr-1"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) =>
                      handleFilterChange("priceMin", e.target.value)
                    }
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="flex items-center text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) =>
                      handleFilterChange("priceMax", e.target.value)
                    }
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span>Clear All Filters</span>
              </button>

              {/* Apply Button */}
              <button
                onClick={applyFilters}
                className={`w-full mt-2 px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200 flex items-center justify-center space-x-2 ${
                  hasUnappliedChanges()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {hasUnappliedChanges() ? (
                  <>
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                    </svg>
                    <span>Apply Filters</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Filters Applied</span>
                  </>
                )}
              </button>
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Active Filters:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {appliedFilters.category && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Category: {getCategoryName(appliedFilters.category)}
                    </span>
                  )}
                  {appliedFilters.brand && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Brand: {getBrandName(appliedFilters.brand)}
                    </span>
                  )}
                  {appliedFilters.hasDiscount !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Discount:{" "}
                      {appliedFilters.hasDiscount === "yes" ? "Yes" : "No"}
                    </span>
                  )}
                  {appliedFilters.rating !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Rating:{" "}
                      {
                        ratingOptions.find(
                          (o) => o.value === appliedFilters.rating
                        )?.label
                      }
                    </span>
                  )}
                  {appliedFilters.condition !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Condition:{" "}
                      {appliedFilters.condition === "new" ? "New" : "Used"}
                    </span>
                  )}
                  {appliedFilters.negotiable !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Negotiable:{" "}
                      {appliedFilters.negotiable === "yes" ? "Yes" : "No"}
                    </span>
                  )}
                  {(appliedFilters.priceMin || appliedFilters.priceMax) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Price: ${appliedFilters.priceMin || "0"} - $
                      {appliedFilters.priceMax || "∞"}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Filter Overlay */}
          {isFilterOpen && (
            <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 flex items-end">
              <div
                id="mobile-filter"
                className="bg-white w-full max-h-3/4 rounded-t-lg p-6 animate-slide-up overflow-y-auto"
              >
                {/* Mobile Filter Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Filters
                    </h2>
                    {getActiveFiltersCount() > 0 && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Filter Content */}
                <div className="space-y-4 pb-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <select
                      value={filters.brand}
                      onChange={(e) =>
                        handleFilterChange("brand", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Brands</option>
                      {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Discount Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Has Discount
                    </label>
                    <div className="flex space-x-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="discount-mobile"
                          value="all"
                          checked={filters.hasDiscount === "all"}
                          onChange={(e) =>
                            handleFilterChange("hasDiscount", e.target.value)
                          }
                          className="mr-1"
                        />
                        <span className="text-sm">All</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="discount-mobile"
                          value="yes"
                          checked={filters.hasDiscount === "yes"}
                          onChange={(e) =>
                            handleFilterChange("hasDiscount", e.target.value)
                          }
                          className="mr-1"
                        />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="discount-mobile"
                          value="no"
                          checked={filters.hasDiscount === "no"}
                          onChange={(e) =>
                            handleFilterChange("hasDiscount", e.target.value)
                          }
                          className="mr-1"
                        />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Rating
                    </label>
                    <select
                      value={filters.rating}
                      onChange={(e) =>
                        handleFilterChange("rating", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {ratingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Condition Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Condition
                    </label>
                    <select
                      value={filters.condition}
                      onChange={(e) =>
                        handleFilterChange("condition", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {conditionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Negotiable Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Negotiable
                    </label>
                    <div className="flex space-x-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="negotiable-mobile"
                          value="all"
                          checked={filters.negotiable === "all"}
                          onChange={(e) =>
                            handleFilterChange("negotiable", e.target.value)
                          }
                          className="mr-1"
                        />
                        <span className="text-sm">All</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="negotiable-mobile"
                          value="yes"
                          checked={filters.negotiable === "yes"}
                          onChange={(e) =>
                            handleFilterChange("negotiable", e.target.value)
                          }
                          className="mr-1"
                        />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="negotiable-mobile"
                          value="no"
                          checked={filters.negotiable === "no"}
                          onChange={(e) =>
                            handleFilterChange("negotiable", e.target.value)
                          }
                          className="mr-1"
                        />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceMin}
                        onChange={(e) =>
                          handleFilterChange("priceMin", e.target.value)
                        }
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="flex items-center text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceMax}
                        onChange={(e) =>
                          handleFilterChange("priceMax", e.target.value)
                        }
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={clearFilters}
                      className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors duration-200"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={applyFilters}
                      className={`flex-1 px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200 ${
                        hasUnappliedChanges()
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {hasUnappliedChanges()
                        ? "Apply Filters"
                        : "Filters Applied"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <style jsx>{`
            @keyframes slide-up {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0);
              }
            }
            .animate-slide-up {
              animation: slide-up 0.3s ease-out;
            }
          `}</style>
        </div>
        <section className="p-2">
          <div className="title flex justify-between items-center">
            <span>{categoryId !== "1234" ? "Category" : "Product"}</span>
          </div>

          <h2 className="header w-fit">electronices</h2>
          <div>
            <ul className="products">
              {filteredProducts.map((product) => (
                <li
                  className="p-2 bg-white rounded-lg hover:shadow-xl cursor-pointer"
                  key={product.id}
                >
                  <ProductItem data={product} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CategoryPage;
