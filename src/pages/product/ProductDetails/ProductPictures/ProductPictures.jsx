import { useState } from "react";
import Picture from "./Picture/Picture";
import MainPicture from "./MainPicture/MainPicture";
import "./ProductPictures.css";
import Scroll from "../../../../components/Scroll/Scroll";
// import Scroll from "../../../home/Scroll";

const cards = [
  { id: 1, type: "image", title: "woman", src: "cards/card5.png" },
  { id: 2, type: "image", title: "man", src: "cards/card4.webp" },
  { id: 3, type: "image", title: "phone", src: "cards/card7.png" },
  { id: 4, type: "image", title: "laptop", src: "cards/card8.png" },
  { id: 5, type: "image", title: "Head Phone", src: "cards/card2.webp" },
  { id: 6, type: "image", title: "Bag", src: "cards/card6.png" },
  { id: 7, type: "image", title: "toys", src: "cards/card1.png" },
  {
    id: 8,
    type: "video",
    title: "toys",
    src: "بنك الحظ.mp4",
  },
];

function ProductPictures() {
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [immediateCard, setImmediateCard] = useState(null);

  const handleHoverCard = (data) => {
    setImmediateCard(data);
  };

  const handleLeaveCard = () => {
    setImmediateCard(null);
  };

  const handleClickCard = (data) => {
    setSelectedCard(data);
  };

  return (
    <div className="product-pictures">
      <div className="pictures">
        {cards.map((card) => (
          <Picture
            key={card.id}
            card={card}
            selectedImage={selectedCard}
            onMouseEnter={handleHoverCard}
            onMouseLeave={handleLeaveCard}
            onClick={handleClickCard}
          />
        ))}
      </div>
      {/* <Scroll position="up" showScroll={true}>
        {cards.map((card) => (
          <Picture
            key={card.id}
            card={card}
            selectedImage={selectedImage}
            onMouseEnter={handleHoverImage}
            onMouseLeave={handleLeaveImage}
            onClick={handleClickImage}
          />
        ))}
      </Scroll> */}
      <MainPicture card={immediateCard ? immediateCard : selectedCard} />
    </div>
  );
}

export default ProductPictures;
