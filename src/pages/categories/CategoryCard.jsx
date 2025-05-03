import "./CategoryCard.css";

function CategoryCard({ imageSrc, title }) {
  return (
    <figure className="rounded-xl overflow-hidden h-80 card cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105">
      <img src={imageSrc} alt={title} className="w-full h-full" />
      <p>{title}</p>
    </figure>
  );
}

export default CategoryCard;
