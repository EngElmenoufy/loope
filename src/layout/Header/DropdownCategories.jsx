import DropdownCategory from "./DropdownCategory";

const categories = [
  { name: "Mobiles, Tablets & Accessories", to: "category" },
  { name: "Computers & Office Supplies", to: "category" },
  { name: "TVs & Electronics", to: "category" },
  { name: "Women's Fashion", to: "category" },
  { name: "Men's Fashion", to: "category" },
  { name: "Kids Fashion", to: "category" },
  { name: "Health, Beauty & Perfumes", to: "category" },
  { name: "Supermarket", to: "category" },
];

function DropdownCategories() {
  return (
    <div className="dropdown absolute left-0 top-12 w-72 max-h-[500px] overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200 z-50">
      {categories.map((category) => (
        <DropdownCategory key={category.name} category={category} />
      ))}
    </div>
  );
}

export default DropdownCategories;
