import { useEffect, useState } from "react";
import Header from "../../layout/Header/Header";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./CategoryPage.css";
import Filters from "./Filters";

function CategoryPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Update screen size state on window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 1024);
  //     if (window.innerWidth >= 1024) {
  //       setIsDrawerOpen(false); // Close the drawer on larger screens
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen((isOpen) => !isOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: "$129.99",
      description:
        "Premium noise-cancelling wireless headphones with 30-hour battery life.",
      rate: 4,
      image: "cards/card1.png",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: "$199.99",
      description:
        "Fitness tracker with heart rate monitor, GPS, and 7-day battery life.",
      rate: 3,
      image: "cards/card2.webp",
    },
    {
      id: 3,
      title: "Smartphone Pro",
      price: "$899.99",
      description:
        'Latest flagship smartphone with 6.7" display and 108MP camera.',
      rate: 2,
      image: "cards/card8.png",
    },
    {
      id: 4,
      title: "Laptop Ultra",
      price: "$1499.99",
      description:
        "Powerful laptop with 16GB RAM, 1TB SSD and dedicated graphics.",
      rate: 5,
      image: "cards/card4.webp",
    },
    {
      id: 5,
      title: "Bluetooth Speaker",
      price: "$79.99",
      description:
        "Waterproof Bluetooth speaker with 360° sound and 12-hour playback.",
      rate: 1,
      image: "cards/card5.png",
    },
    {
      id: 6,
      title: "Coffee Maker",
      price: "$149.99",
      description:
        "Smart coffee maker with programmable brewing and temperature control.",
      rate: 4,
      image: "cards/card6.png",
    },
    {
      id: 7,
      title: "Drone Camera",
      price: "$349.99",
      description:
        "HD drone with 4K camera, 30-minute flight time and obstacle avoidance.",
      rate: 2,
      image: "cards/card7.png",
    },
    {
      id: 8,
      title: "Gaming Console",
      price: "$499.99",
      description:
        "Next-gen gaming console with 1TB storage and 4K gaming capabilities.",
      rate: 1,
      image: "cards/card8.png",
    },
  ];

  return (
    <div>
      <main className="category grid grid-cols-12 gap-4 m-4">
        <Filters isOpen={isDrawerOpen} onClose={toggleDrawer} />
        <section>
          <div className="title flex justify-between items-center">
            <span>Category</span>

            <button className="filter-button" onClick={toggleDrawer}>
              <img
                src="icons/filter.png"
                alt="filter icon"
                className="filter-button-icon"
              />
              <span className="filter-button-text">Filters</span>
            </button>
          </div>
          {isDrawerOpen && (
            <div className="overlay" onClick={closeDrawer}></div>
          )}
          <h2 className="header w-fit">electronices</h2>
          <div>
            <ul className="products">
              {products.map((product) => (
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
