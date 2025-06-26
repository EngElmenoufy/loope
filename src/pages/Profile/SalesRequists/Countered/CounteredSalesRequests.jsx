import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import SingleCouteredSalesRequests from "./SingleCounteredSalesRequests";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

function CounteredSalesRequests({ requests, isSeller }) {
  const [isEmpty, setIsEmpty] = useState(false);

  const navigate = useNavigate();
  const handleToContinueShopping = () => {
    navigate("/products");
  };

  const handleToFavorite = () => {
    navigate("/saved-items");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsEmpty(true);
    }, 1000);
  });

  return (
    <>
      {requests.length !== 0 ? (
        <div className="space-y-6">
          {requests.map((request) => (
            <SingleCouteredSalesRequests
              key={request?.id}
              isSeller={isSeller}
              request={request}
              // setSelectedOrder={setSelectedOrder}
              // selectedOrder={selectedOrder}
            />
          ))}
        </div>
      ) : (
        <>
          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-gray-100 rounded-full p-8 mb-6">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your countered requests is empty
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-md">
                Start shopping to find amazing deals!
              </p>

              <div className="flex flex-col justify-center items-center sm:flex-row gap-4 mb-8">
                <Button
                  type="main"
                  text="Continue Shopping"
                  otherClass="!px-6 !py-3 !rounded-full !w-fit"
                  onClick={() => handleToContinueShopping()}
                />
                <Button
                  type="second"
                  text="View Wishlist"
                  otherClass="!px-6 !py-3 !rounded-full !w-fit "
                  onClick={() => handleToFavorite()}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CounteredSalesRequests;
