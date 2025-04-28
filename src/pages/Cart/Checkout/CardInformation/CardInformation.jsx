import { useState } from "react";

function CardInformation() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvc, setCvc] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16); // Allow only 16 digits
    setCardNumber(value);
  };

  const handleExpiryMonthChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2); // Allow only 2 digits
    if (value > 12) {
      return;
    }
    setExpiryMonth(value);
  };

  const handleExpiryYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2); // Allow only 2 digits
    setExpiryYear(value);
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3); // Allow only 3 digits
    setCvc(value);
  };

  return (
    <div>
      <div className="mb-4">
        <h5>Card information</h5>
        <div className="flex justify-between items-center my-3">
          <input
            type="number"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e)}
            placeholder="Card number"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />

          {/* <FaCreditCard className="text-gray-400 ml-2 mt-2" /> */}
        </div>
        <div className="flex my-3">
          <div className="flex-1 mr-2 flex gap-x-2">
            <input
              type="number"
              value={expiryMonth}
              onChange={(e) => handleExpiryMonthChange(e)}
              placeholder="MM"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
            <input
              type="number"
              value={expiryYear}
              onChange={(e) => handleExpiryYearChange(e)}
              placeholder="YY"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex-1 ml-2">
            <input
              type="number"
              value={cvc}
              onChange={(e) => handleCvcChange(e)}
              placeholder="CVC"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
            {/* <FaLock className="text-gray-400 ml-2 mt-2" /> */}
          </div>
        </div>
        <div className="my-3">
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Card Name"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>
      {/* <div className="mb-4">
        <h2 className="text-gray-700 font-semibold">Country or region</h2>
        <div className="relative">
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <select
            id="country"
            className="border border-gray-300 rounded-lg p-2 w-full mt-2 appearance-none"
          >
            <option>United States</option> */}
      {/* Add more options as needed */}
      {/* </select> */}
      {/* <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
      {/* </div>
        <div className="mt-2">
          <label htmlFor="zip" className="sr-only">
            ZIP
          </label>
          <input
            type="text"
            id="zip"
            placeholder="ZIP"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div> */}
      <div className="flex items-center mb-4">
        <input type="checkbox" id="save-card" className="mr-2" />
        <label htmlFor="save-card" className="text-gray-700">
          Save this card for future powdur payments
        </label>
      </div>
    </div>
  );
}

export default CardInformation;
