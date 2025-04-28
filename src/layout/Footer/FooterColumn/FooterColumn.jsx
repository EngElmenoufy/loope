const FooterColumn = ({ title, links }) => {
  return (
    <div className="footer-column">
      {/* <h3>{title}</h3> */}
      <h4 className="mb-2">{title}</h4>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="ml-2">
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
