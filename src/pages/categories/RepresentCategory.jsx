import CategoryCard from "./CategoryCard";

const categoryCards = [
  {
    src: "categories/category1.jpg",
    title: "Co-Ords & Jumpsuits",
  },
  {
    src: "categories/category2.jpg",
    title: "Pants",
  },
  {
    src: "categories/category3.jpg",
    title: "Accessories",
  },
  {
    src: "categories/category4.jpg",
    title: "Dresses",
  },
  {
    src: "categories/category5.jpg",
    title: "Intimates & Sleepwear",
  },
  {
    src: "categories/category6.jpg",
    title: "Swim",
  },
  {
    src: "categories/category7.jpg",
    title: "Jackets & Coats",
  },
  {
    src: "categories/category8.jpg",
    title: "Jewellery",
  },
  {
    src: "categories/category9.jpg",
    title: "Hats",
  },
  {
    src: "categories/category10.jpg",
    title: "Skirts",
  },
];

function RepresentCategory() {
  return (
    <>
      <div className="title">
        <span>Fashion</span>
      </div>
      <div className="relative mt-3 mb-8">
        <div className="header-content">
          <h3>Women’s Clothing</h3>
          {/* <div role="link" className="see-more-link">
            <span className="text-nowrap">see more</span>
            <span className="!w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#18403c"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
            </span>
          </div> */}
        </div>

        <div className="category-cards p-8 md:px-5">
          {categoryCards.map((card) => (
            <CategoryCard
              key={card.title}
              imageSrc={card.src}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default RepresentCategory;
