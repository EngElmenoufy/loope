function Picture({
  isDefined = true,
  card,
  selectedImage,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  if (!isDefined) {
    return <div className="bg-[#f2f2f2] w-full h-full"></div>;
  }

  const isClicked = card === selectedImage;

  return (
    <li
      className={`w-24 h-24 mb-4 overflow-hidden rounded-2xl cursor-pointer ${isClicked ? "border-2 border-black" : "hover:border hover:border-black"} transition-all`}
      onMouseEnter={() => onMouseEnter(card)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(card)}
    >
      <img
        src={card}
        alt="product image"
        className={`w-full h-full rounded-2xl ${isClicked ? "scale-90" : "hover:scale-95"} transition-all`}
      />
    </li>
  );
}

export default Picture;
