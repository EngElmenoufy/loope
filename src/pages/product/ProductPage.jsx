import ExploreProducts from "../../components/ExploreProducts/ExploreProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductReviews from "./ProductReviews/ProductReviews";
import ProductDetails from "./ProductDetails/ProductDetails";

import "./ProductPage.css";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: "129.99 AED",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    rate: 4,
    image: "cards/card1.png",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: "199.99 AED",
    description:
      "Fitness tracker with heart rate monitor, GPS, and 7-day battery life.",
    rate: 3,
    image: "cards/card2.webp",
  },
  {
    id: 3,
    title: "Smartphone Pro",
    price: "899.99 AED",
    description:
      'Latest flagship smartphone with 6.7" display and 108MP camera.',
    rate: 2,
    image: "cards/card8.png",
  },
  {
    id: 4,
    title: "Laptop Ultra",
    price: "1499.99 AED",
    description:
      "Powerful laptop with 16GB RAM, 1TB SSD and dedicated graphics.",
    rate: 5,
    image: "cards/card4.webp",
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    price: "79.99 AED",
    description:
      "Waterproof Bluetooth speaker with 360° sound and 12-hour playback.",
    rate: 1,
    image: "cards/card5.png",
  },
  {
    id: 6,
    title: "Coffee Maker",
    price: "149.99 AED",
    description:
      "Smart coffee maker with programmable brewing and temperature control.",
    rate: 4,
    image: "cards/card6.png",
  },
  {
    id: 7,
    title: "Drone Camera",
    price: "349.99 AED",
    description:
      "HD drone with 4K camera, 30-minute flight time and obstacle avoidance.",
    rate: 2,
    image: "cards/card7.png",
  },
  {
    id: 8,
    title: "Gaming Console",
    price: "499.99 AED",
    description:
      "Next-gen gaming console with 1TB storage and 4K gaming capabilities.",
    rate: 1,
    image: "cards/card8.png",
  },
];

function ProductPage() {
  return (
    <>
      <main>
        <ProductDetails />

        <ExploreProducts
          title={"You may also like"}
          header={"Products related to this item"}
        >
          {products.map((product) => (
            <li
              className="p-2 bg-white rounded-lg hover:shadow-xl cursor-pointer"
              key={product.id}
            >
              <ProductItem isFixedWidth={true} data={product} />
            </li>
          ))}
        </ExploreProducts>
        <ProductReviews />
      </main>
    </>
  );
}

export default ProductPage;
