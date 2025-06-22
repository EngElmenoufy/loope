import React, { useState, useEffect } from "react";
import SingleSellerProduct from "./SingleSellerProduct";

const SellerProductsList = ({
  updateSellerProduct,
  token,
  removeSellerProduct,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [SellerProducts, setSellerProducts] = useState([]);
  const URL = "http://localhost:3000";

  const getSellerProducts = async () => {
    if (token) {
      try {
        const response = await fetch(`${URL}/api/products/my-products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.data) {
          setSellerProducts(data.data);
        }
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  };
  useEffect(() => {
    getSellerProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-2xl font-bold">MY PRODUCTS</h1>
          </div>
          {SellerProducts.map((product) => (
            <SingleSellerProduct
              product={product}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              updateSellerProduct={updateSellerProduct}
              removeSellerProduct={removeSellerProduct}
              getSellerProducts={getSellerProducts}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SellerProductsList;
