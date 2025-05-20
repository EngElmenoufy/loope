import IconButton from "../../../../../components/IconButton/IconButton";
import Scroll from "../../../../../components/Scroll/Scroll";
import "./MainPicture.css";

// const icons = [
//   {
//     src: "icons/favorite.png",
//     alt: "favorite icon",
//     position: "top-right",
//   },
//   {
//     src: "icons/arrow-left.png",
//     alt: "arrow left icon",
//     position: "left",
//   },
//   {
//     src: "icons/arrow-right.png",
//     alt: "arrow right icon",
//     position: "right",
//   },
// ];

// const cards = [
//   { id: 1, title: "woman", imageSrc: "cards/card5.png" },
//   { id: 2, title: "man", imageSrc: "cards/card4.webp" },
//   { id: 3, title: "phone", imageSrc: "cards/card7.png" },
//   { id: 4, title: "laptop", imageSrc: "cards/card8.png" },
//   { id: 5, title: "Head Phone", imageSrc: "cards/card2.webp" },
//   { id: 6, title: "Bag", imageSrc: "cards/card6.png" },
//   { id: 7, title: "toys", imageSrc: "cards/card1.png" },
// ];

function MainPicture({ card }) {
  return (
    // <div className="relative bg-[#f2f2f2] w-full rounded-2xl">
    //   <img src={imageSrc} alt="man picture" className="main-picture" />
    //   {icons.map((icon) => (
    //     <IconButton key={icon.alt} icon={icon} />
    //   ))}
    // </div>
    // <Scroll position={"left"} showScroll={true} fullScroll={true}>
    //   {cards.map((card) => (
    //     <li className="bg-[#f2f2f2] shrink-0 grow-0 basis-4/5 md:basis-full rounded-2xl">
    //       <img
    //         src={card.imageSrc}
    //         alt={card.title}
    //         className="main-picture w-full h-full"
    //       />
    //     </li>
    //   ))}
    // </Scroll>
    <div className=" shrink-0 grow-0 basis-4/5 md:basis-full rounded-2xl">
      <img src={card} alt={card} className="main-picture w-full h-full" />
    </div>
  );
}

export default MainPicture;
