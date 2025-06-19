import ExploreProducts from "../../components/ExploreProducts/ExploreProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductReviews from "./ProductReviews/ProductReviews";
import ProductDetails from "./ProductDetails/ProductDetails";
import { useNavigate, useParams } from "react-router-dom";

import "./ProductPage.css";
import { useEffect, useState } from "react";

// const products = [
//   {
//     id: 1,
//     title: "Wireless Headphones",
//     price: "129.99 AED",
//     description:
//       "Premium noise-cancelling wireless headphones with 30-hour battery life.",
//     rate: 4,
//     avatar: "cards/card1.png",
//   },
//   {
//     id: 2,
//     title: "Smart Watch",
//     price: "199.99 AED",
//     description:
//       "Fitness tracker with heart rate monitor, GPS, and 7-day battery life.",
//     rate: 3,
//     avatar: "cards/card2.webp",
//   },
//   {
//     id: 3,
//     title: "Smartphone Pro",
//     price: "899.99 AED",
//     description:
//       'Latest flagship smartphone with 6.7" display and 108MP camera.',
//     rate: 2,
//     avatar: "cards/card8.png",
//   },
//   {
//     id: 4,
//     title: "Laptop Ultra",
//     price: "1499.99 AED",
//     description:
//       "Powerful laptop with 16GB RAM, 1TB SSD and dedicated graphics.",
//     rate: 5,
//     avatar: "cards/card4.webp",
//   },
//   {
//     id: 5,
//     title: "Bluetooth Speaker",
//     price: "79.99 AED",
//     description:
//       "Waterproof Bluetooth speaker with 360° sound and 12-hour playback.",
//     rate: 1,
//     avatar: "cards/card5.png",
//   },
//   {
//     id: 6,
//     title: "Coffee Maker",
//     price: "149.99 AED",
//     description:
//       "Smart coffee maker with programmable brewing and temperature control.",
//     rate: 4,
//     avatar: "cards/card6.png",
//   },
//   {
//     id: 7,
//     title: "Drone Camera",
//     price: "349.99 AED",
//     description:
//       "HD drone with 4K camera, 30-minute flight time and obstacle avoidance.",
//     rate: 2,
//     avatar: "cards/card7.png",
//   },
//   {
//     id: 8,
//     title: "Gaming Console",
//     price: "499.99 AED",
//     description:
//       "Next-gen gaming console with 1TB storage and 4K gaming capabilities.",
//     rate: 1,
//     avatar: "cards/card8.png",
//   },
// ];

function ProductPage({
  categories,
  brands,
  token,
  addToCart,
  products,
  addFavorite,
  addOrRemoveFavorite


































  
}) {
  const [productData, setProductData] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [productReviews, setProductReviews] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const navigate = useNavigate();

  const { id: productId } = useParams();

  const getProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.data) {
        setProductData(data.data);
        getProductReviews(data.data._id);
        getSellerData(data.data.sellerId);
        if (data.data.category) {
          getProductCategory(data.data.category);
        }
        if (data.data.Brand) {
          getProductCategory(data.data.Brand);
        }
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getSellerData = async (sellerId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${sellerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.data) {
        setSellerData(data.data);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getProductReviews = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data) {
        setProductReviews(data);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleAddReview = async (reviewData) => {
    const redata = { ...reviewData, productId: productData._id };

    try {
      const response = await fetch(`http://localhost:3000/api/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(redata),
      });

      const data = await response.json();
      getProductReviews(productData._id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setTimeout(() => {
        getProductDetails();
      }, 2000);
    }
  };

  const handleProductsWithoutFilter = () => {
    navigate("/products");
  };

  return (
    <>
      <main>
        <ProductDetails
          categories={categories}
          brands={brands}
          data={productData}
          sellerData={sellerData}
          addToCart={addToCart}
        />

        {/* <ExploreProducts
          title={"You may also like"}
          header={"Products related to this item"}
        >
          {products.map((product) => (
            <li
              className="p-2 w-52 flex-shrink-0 bg-white rounded-lg hover:shadow-xl cursor-pointer"
              key={product.id}
            >
              <ProductItem isFixedWidth={true} data={product} />
            </li>
          ))}
        </ExploreProducts> */}

        <ExploreProducts
          onClickSeeMore={handleProductsWithoutFilter}
          title={"Best Sales"}
          header={"Explore Our Products"}
        >
          {products.slice(0, 10).map((product) => (
            <li
              className="p-2 bg-white w-52 flex-shrink-0 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
              key={product._id}
            >
              <ProductItem
                isFixedWidth={true}
                data={product}
                token={token}
                onAddOrRemoveFavorite={addOrRemoveFavorite}
              />
            </li>
          ))}
        </ExploreProducts>
        <ProductReviews
          productReviews={productReviews}
          productData={productData}
          onAddReview={handleAddReview}
        />
      </main>
    </>
  );
}

export default ProductPage;
