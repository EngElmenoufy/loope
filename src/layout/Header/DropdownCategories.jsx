import DropdownCategory from "./DropdownCategory";

function DropdownCategories({ categories, onClose }) {
  return (
    <div className="dropdown absolute left-0 top-12 w-72 max-h-[500px] overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200 z-50">
      {categories.map((category) => (
        <DropdownCategory
          key={category.name}
          category={category}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

export default DropdownCategories;
