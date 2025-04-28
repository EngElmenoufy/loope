import { useState } from "react";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle email subscription (e.g., API call)
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <div className="subscription-form">
      {/* <h3>Subscribe</h3> */}
      <h4 className="mb-2">Subscribe</h4>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-4/5"
        />
        <button type="submit" className="w-1/5">
          →
        </button>
      </form>
      <p>
        Join our mailing list to be the first to know about the latest products
        and exclusive discounts. Don’t worry, you can opt out on special offers
        tailored just for you!
      </p>
    </div>
  );
};

export default SubscriptionForm;
