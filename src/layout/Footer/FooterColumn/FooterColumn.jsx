import { Link } from "react-router-dom";

const FooterColumn = ({ title, links }) => {
  return (
    <div className="footer-column">
      {/* <h3>{title}</h3> */}
      <h4 className="mb-2">{title}</h4>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="ml-2">
            {title === "Brand Lineup" ? (
              <p className="text-gray-300">{link}</p>
            ) : (
              <Link to={"/about-us"}>{link}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
