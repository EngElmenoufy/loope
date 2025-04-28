import FooterColumn from "./FooterColumn/FooterColumn";
import SubscriptionForm from "./SubscriptionForm/SubscriptionForm";
import FooterBottom from "./FooterBottom/FooterBottom";
import "./Footer.css";

const Footer = () => {
  const brandLineup = ["Apple", "Samsung", "Dell", "Lenovo", "HP", "Microsoft"];
  const getToKnowUs = [
    "About Us",
    "How It Works",
    "Trade-In",
    "Help Center",
    "Contact Us",
  ];
  const infoHub = [
    "Shipping",
    "Returns and Refunds",
    "Sellers: Register to Sell",
    "Seller Panel",
  ];
  const ourPolicies = [
    "Terms of Service",
    "Limited Warranty",
    "Privacy",
    "Cookies",
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <FooterColumn title="Brand Lineup" links={brandLineup} />
        <FooterColumn title="Get to Know Us" links={getToKnowUs} />
        <FooterColumn title="Info Hub" links={infoHub} />
        <FooterColumn title="Our Policies" links={ourPolicies} />
        <SubscriptionForm />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;

// import "./Footer.css";

// const columns = [
//   {
//     title: "Get to Know Us",
//     lists: ["About Loope", "Careers", "Loope Science"],
//   },
//   {
//     title: "Shop with Us",
//     lists: ["Your Account", "Your Orders", "Your Addresses", "Your Lists"],
//   },
//   {
//     title: "Make Money with Us",
//     lists: [
//       "Protect and build your brand",
//       "Advertise Your Products",
//       "Sell on Loope",
//       "Fulfillment by Loope",
//       "Supply to Amazon",
//     ],
//   },
//   {
//     title: "Let Us Help You",
//     lists: [
//       "Help",
//       "Shipping & Delivery",
//       "Returns & Replacements",
//       "Recalls and Product Safety Alerts",
//       "Loope App Download",
//     ],
//   },
// ];

// function Footer() {
//   return (
//     <footer>
//       <div className="footer-cols">
//         {columns.map((col, index) => (
//           <div key={index}>
//
//             <div className="flex flex-col">
//               {col.lists.map((item, itemIndex) => (
//                 <a key={itemIndex}>{item}</a>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </footer>
//   );
// }

// export default Footer;

{
  /* <footer className="p-6 bg-[#18403C]">
      <h1 className="text-center mb-6 text-3xl font-medium text-white hover:cursor-pointer">
        <a>Loope</a>
      </h1>
      <div className="grid grid-cols-4 text-white">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-medium">Get to Know Us</h4>
          <a>About Loope</a>
          <a>Careers</a>
          <a>Loope Science</a>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Shop with Us</h4>
          <a>Your Account</a>
          <a>Your Orders</a>
          <a>Your Addresses</a>
          <a>Your Lists</a>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Make Money with Us</h4>
          <a>Protect and build your brand</a>
          <a>Advertise Your Products</a>
          <a>Sell on Loope</a>
          <a>Fulfillment by Loope</a>
          <a>Supply to Amazon</a>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Let Us Help You</h4>
          <a>Help</a>
          <a>Shipping & Delivery</a>
          <a>Returns & Replacements</a>
          <a>Recalls and Product Safety Alerts</a>
          <a>Loope App Download</a>
        </div>
      </div>
      <hr />
      <div>
        <h1 className="text-3xl font-medium text-white hover:cursor-pointer">
          <a>Loope</a>
        </h1>
      </div>
    </footer> */
}
