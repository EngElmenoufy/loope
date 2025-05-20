import Scroll from "../Scroll/Scroll";

import "./ExploreProducts.css";

const ExploreProducts = ({
  header,
  title,
  showScroll = true,
  children,
  onClickSeeMore,
}) => {
  return (
    <section className="explore-products">
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="relative my-3">
        <div className="header-content">
          <h3>{header}</h3>
          <div role="link" onClick={onClickSeeMore} className="see-more-link">
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
          </div>
        </div>
        {/* Navigation Arrows */}
      </div>
      <Scroll position={"left"} showScroll={showScroll}>
        {children}
      </Scroll>
    </section>
  );
};

export default ExploreProducts;
