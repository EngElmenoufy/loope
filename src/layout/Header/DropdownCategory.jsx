import { Link } from "react-router-dom";

function DropdownCategory({ category }) {
  return (
    <Link
      to={category.to}
      className="p-3 cursor-pointer hover:bg-gray-300 block"
    >
      {category.name}
    </Link>
  );
}

export default DropdownCategory;
