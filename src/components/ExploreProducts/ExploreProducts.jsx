import Scroll from "../Scroll/Scroll";

import "./ExploreProducts.css";

const ExploreProducts = ({ header, title, showScroll = true, children }) => {
  return (
    <section className="explore-products">
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="relative my-3">
        <div className="header-content">
          <h3>{header}</h3>
          {/* <div role="link" className="see-more-link">
            <span className="text-nowrap">see more</span>
            <span className="!w-8">
              <img
                src="icons/arrow-right-alt.png"
                alt="see more products"
                className="icon"
              />
            </span>
          </div> */}
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
