import { useEffect, useRef, useState } from "react";
import IconButton from "../IconButton/IconButton";

import "./Scroll.css";

export default function Scroll({
  showScroll,
  position,
  fullScroll = false,
  children,
}) {
  const scrollContainerRef = useRef(null);
  const [isAtStartX, setIsAtStartX] = useState(true); // Horizontal start
  const [isAtEndX, setIsAtEndX] = useState(false); // Horizontal end
  const [isAtStartY, setIsAtStartY] = useState(true); // Vertical start
  const [isAtEndY, setIsAtEndY] = useState(false); // Vertical end

  const arrowIcons = [
    { src: "icons/arrow-left.png", alt: "arrow left icon", position: "left" },
    {
      src: "icons/arrow-right.png",
      alt: "arrow right icon",
      position: "right",
    },
    { src: "icons/arrow-up.png", alt: "arrow up icon", position: "up" },
    { src: "icons/arrow-down.png", alt: "arrow down icon", position: "down" },
  ];

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const {
        scrollLeft,
        scrollWidth,
        clientWidth,
        scrollTop,
        scrollHeight,
        clientHeight,
      } = scrollContainerRef.current;
      const SCROLL_THRESHOLD = 3; // Small buffer for rounding errors
      // Horizontal checks
      setIsAtStartX(scrollLeft === 0);
      setIsAtEndX(scrollLeft + clientWidth + SCROLL_THRESHOLD >= scrollWidth);

      // Vertical checks
      setIsAtStartY(scrollTop === 0);
      setIsAtEndY(scrollTop + clientHeight + SCROLL_THRESHOLD >= scrollHeight);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const handleScrollLeft = () => {
    const container = scrollContainerRef.current;
    if (fullScroll) {
      container?.scrollBy({
        left: -container.clientWidth,
        behavior: "smooth",
      });
    } else {
      container?.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    const container = scrollContainerRef.current;
    // console.log(fullScroll);
    if (fullScroll) {
      container?.scrollBy({
        left: container.clientWidth,
        behavior: "smooth",
      });
    } else {
      container?.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleScrollUp = () => {
    const container = scrollContainerRef.current;
    container?.scrollBy({ top: -300, behavior: "smooth" });
  };

  const handleScrollDown = () => {
    const container = scrollContainerRef.current;
    container?.scrollBy({ top: 300, behavior: "smooth" });
  };

  // Determine which buttons to show based on position
  const isHorizontal = position === "left" || position === "right";
  const isVertical = position === "up" || position === "down";

  return (
    <div className="relative overflow-hidden">
      <ul
        ref={scrollContainerRef}
        className={`flex ${
          isHorizontal ? "flex-row" : "flex-col products-col"
        } overflow-x-auto overflow-y-hidden scroll-smooth gap-4 pb-2 ${
          !showScroll && isHorizontal ? "justify-between" : ""
        } w-full h-full`}
      >
        {children}
      </ul>
      {/* <ul
        ref={scrollContainerRef}
        className={`flex ${!showScroll ? "justify-between" : ""} overflow-auto scroll-smooth gap-4 mx-4 pb-2`}
      >
        {children}
      </ul> */}
      {showScroll && (
        <div className="arrows">
          {arrowIcons.map((icon) => {
            if (
              isHorizontal &&
              (icon.position === "left" || icon.position === "right")
            ) {
              return (
                <IconButton
                  key={icon.position}
                  icon={icon}
                  onClick={
                    icon.position === "left"
                      ? handleScrollLeft
                      : handleScrollRight
                  }
                  disable={icon.position === "left" ? isAtStartX : isAtEndX}
                />
              );
            }
            if (
              isVertical &&
              (icon.position === "up" || icon.position === "down")
            ) {
              return (
                <IconButton
                  key={icon.position}
                  icon={icon}
                  onClick={
                    icon.position === "up" ? handleScrollUp : handleScrollDown
                  }
                  disable={icon.position === "up" ? isAtStartY : isAtEndY}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

// import { useEffect, useRef, useState } from "react";
// import IconButton from "../../components/IconButton/IconButton";

// function Scroll({ showScroll, position, children }) {
//   const scrollContainerRef = useRef(null);
//   const [isAtStart, setIsAtStart] = useState(true);
//   const [isAtEnd, setIsAtEnd] = useState(false);

//   const arrowIcons = [
//     {
//       src: "icons/arrow-left.png",
//       alt: "arrow left icon",
//       position: "left",
//     },
//     {
//       src: "icons/arrow-right.png",
//       alt: "arrow right icon",
//       position: "right",
//     },
//     {
//       src: "icons/arrow-up.png",
//       alt: "arrow up icon",
//       position: "up",
//     },
//     {
//       src: "icons/arrow-down.png",
//       alt: "arrow down icon",
//       position: "down",
//     },
//   ];

//   const checkScrollPosition = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } =
//         scrollContainerRef.current;
//       setIsAtStart(scrollLeft === 0);
//       setIsAtEnd(scrollLeft + clientWidth + 3 >= scrollWidth);
//     }
//   };

//   useEffect(() => {
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener("scroll", checkScrollPosition);
//       checkScrollPosition(); // Initial check
//     }
//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener("scroll", checkScrollPosition);
//       }
//     };
//   }, []);

//   const handleScrollLeft = () => {
//     // if (scrollContainerRef.current) {
//     //   scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     // }
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     }
//   };

//   const handleScrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative overflow-hidden">
//       <ul
//         ref={scrollContainerRef}
//         className={`flex ${!showScroll ? "justify-between" : ""} overflow-auto scroll-smooth gap-4 mx-4 pb-2`}
//       >
//         {children}
//       </ul>
//       {showScroll ? (
//         <>
//           {arrowIcons.map((icon) => (
//             <>
//               {position === icon.position ? (
//                 <IconButton
//                   icon={icon}
//                   onClick={
//                     icon.position === "left"
//                       ? handleScrollLeft
//                       : handleScrollRight
//                   }
//                   disable={icon.position === "left" ? isAtStart : isAtEnd}
//                 />
//               ) : null}
//             </>
//           ))}
//         </>
//       ) : null}
//     </div>
//   );
// }

// {
//   showScroll ? (
//     <div className="absolute right-4 top-1/2 -translate-y-1/2 flex justify-between items-center w-24">
//       <button
//         onClick={scrollLeft}
//         className={`absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-white transition-colors `}
//         aria-label="Previous products"
//       >
//         <img
//           src={
//             isAtStart ? "icons/arrow-left-hover.png" : "icons/arrow-left.png"
//           }
//           alt="Arrow left"
//           className="w-6 h-6"
//         />
//       </button>

//       <button
//         onClick={scrollRight}
//         className={`absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-white transition-colors ${isAtEnd ? "opacity-50 !cursor-not-allowed" : ""}`}
//         aria-label="Next products"
//       >
//         <img
//           src={
//             isAtEnd ? "icons/arrow-right-hover.png" : "icons/arrow-right.png"
//           }
//           alt="Arrow right"
//           className="w-6 h-6"
//         />
//       </button>
//     </div>
//   ) : null;
// }

// export default Scroll;
