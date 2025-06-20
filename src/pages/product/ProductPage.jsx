import ExploreProducts from "../../components/ExploreProducts/ExploreProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductReviews from "./ProductReviews/ProductReviews";
import ProductDetails from "./ProductDetails/ProductDetails";
import { useNavigate, useParams } from "react-router-dom";

import "./ProductPage.css";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

function ProductPage({
  categories,
  brands,
  token,
  addToCart,
  products,
  addOrRemoveFavorite,
  successMessage,
}) {
  const [productData, setProductData] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [productReviews, setProductReviews] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
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
  }, [productId]);

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
      if (data.status === "error") {
        setShowErrorMessage(true);
      } else {
        setShowSuccessMessage(true);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      const timer1 = setTimeout(() => {
        getProductDetails();
      }, 2000);
      const timer2 = setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 5000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
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
          {products.slice(9, 19).map((product) => (
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
      {successMessage.addToCart && (
        <Alert severity="success" className="fixed bottom-4 right-4 z-50">
          {successMessage.addToCart}
        </Alert>
      )}
      {showSuccessMessage && (
        <Alert severity="success" className="fixed bottom-4 right-4 z-50">
          You added a review successfully!
        </Alert>
      )}
      {showErrorMessage && (
        <Alert severity="warning" className="fixed bottom-4 right-4 z-50">
          You already have a review.
        </Alert>
      )}
    </>
  );
}

export default ProductPage;
