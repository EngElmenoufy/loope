function Picture({ card, selectedImage, onMouseEnter, onMouseLeave, onClick }) {
  const isClicked = card.id === selectedImage?.id;

  return (
    <li
      className={`w-24 h-24 mb-4 overflow-hidden rounded-2xl cursor-pointer ${isClicked ? "border-2 border-black" : "hover:border hover:border-black"} transition-all`}
      onMouseEnter={() => onMouseEnter(card)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(card)}
    >
      {card.type === "video" ? (
        <div className="relative w-full h-full">
          <video
            src={card.src}
            className={`w-full h-full rounded-2xl bg-[#f2f2f2] ${isClicked ? "scale-90" : "hover:scale-95"} transition-all`}
            muted
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-2/5 h-2/5 bg-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="100%"
              viewBox="0 -960 960 960"
              width="100%"
              fill="#191919"
            >
              <path d="M320-200v-560l440 280-440 280Z" />
            </svg>
          </div>
          {/* <svg
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-1/2 h-1/2 bg-[#ffffffe6]"
            focusable="false"
            aria-hidden="true"
          >
            <use
              href="#icon-play-filled-64-colored"
              className="text-[#191919]"
            ></use>
          </svg> */}
        </div>
      ) : (
        <img
          src={card.src}
          alt={card.title}
          className={`w-full h-full rounded-2xl bg-[#f2f2f2] ${isClicked ? "scale-90" : "hover:scale-95"} transition-all`}
        />
      )}
    </li>
  );
}

export default Picture;
