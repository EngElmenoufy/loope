import { Link } from "react-router-dom";

function DropdownCategory({ category, onClose }) {
  return (
    <Link
      to={`/category/${category._id}`}
      className="p-3 cursor-pointer block hover:bg-gray-100"
      onClick={onClose}
    >
      {category.name}
    </Link>
  );
}

export default DropdownCategory;
