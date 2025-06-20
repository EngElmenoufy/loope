import { useState } from "react";
import SingleOngoingSale from "./SingleOngoingSale";
import { Alert } from "@mui/material";

function OrderProducts({ order }) {
  const [showSuccessReport, setShowSuccessReport] = useState(false);
  const orderedProducts = order.items;
  return (
    <div>
      {orderedProducts.map((orderedProduct) => (
        <SingleOngoingSale
          key={orderedProduct._id}
          date={order.orderDate}
          address={order.shippingAddress}
          order={orderedProduct}
          paymentMethod={order.paymentMethod}
          setShowSuccessReport={setShowSuccessReport}
        />
      ))}
      {showSuccessReport && (
        <Alert severity="success" className="fixed bottom-4 right-4 z-50">
          You have successfully reported the order.
        </Alert>
      )}
    </div>
  );
}

export default OrderProducts;
