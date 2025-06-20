import Button from "@mui/material/Button";
import ExploreProducts from "../../components/ExploreProducts/ExploreProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
import Card from "./Card";
import Header from "../../layout/Header/Header";
// import Footer from "./Footer";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

function HomePage({ products, token, addOrRemoveFavorite, successMessage }) {
  const discountedProducts = products
    .filter((product) => Number(product.discount) > 0)
    .slice(0, 10);

  const navigate = useNavigate();

  const handleProductsWithFilter = () => {
    navigate({
      pathname: "/products",
      search: "?filter=dis",
    });
  };

  const handleProductsWithoutFilter = () => {
    navigate("/products");
  };

  return (
    // <div className="container mx-auto">
    <div>
      <main className="mx-2 sm:mx-3 md:mx-6">
        <section className="grid grid-cols-8 gap-5 m-2 sm:h-[50vh]">
          <a className="ad col-span-8 lg:col-span-6 relative rounded-lg overflow-hidden grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 bg-[#bac2c2]">
            <div className="max-sm:row-span-2 max-sm:py-24 col-span-1 flex justify-center items-center flex-col gap-5">
              <h2 className="text-4xl text-center">All your faves are here</h2>
              <p className="w-3/4 text-center">
                Refresh your space, elevate your style and power your work.
              </p>
              <Button
                variant="contained"
                className="!bg-[#18403C] !rounded-2xl"
                onClick={() => navigate("/products")}
              >
                Do your thing
              </Button>
            </div>
            <figure className="hidden relative sm:flex justify-center items-center">
              <img
                src="man3.jpg"
                alt="Man clothe"
                className="absolute w-[120%]"
              />
            </figure>
          </a>
          <a className="max-lg:hidden lg:col-span-2 rounded-lg overflow-hidden">
            <img src="woman.jpg" alt="Man clothe" className="h-full w-full" />
          </a>
        </section>
        {/* <ExploreProducts
          title={"Newest"}
          header={"Explore Popular Categories"}
          showScroll={false}
        >
          {cards.map((card) => (
            <li
              key={card.id}
              className="max-w-36 rounded-lg p-2 hover:shadow-xl cursor-pointer"
            >
              <Card data={card} />
            </li>
          ))}
        </ExploreProducts> */}
        <ExploreProducts
          onClickSeeMore={handleProductsWithoutFilter}
          title={"Best Sales"}
          header={"Explore Our Products"}
        >
          {products.slice(0, 10).map((product) => (
            <li
              className="p-2 bg-white w-52 flex-shrink-0 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
              key={product._id}
            >
              <ProductItem
                isFixedWidth={true}
                data={product}
                token={token}
                onAddOrRemoveFavorite={addOrRemoveFavorite}
              />
            </li>
          ))}
        </ExploreProducts>
        <ExploreProducts
          onClickSeeMore={handleProductsWithFilter}
          title={"Best Deals"}
          header={"Today's big deals"}
        >
          {discountedProducts.map((product) => (
            <li
              className="p-2 w-52 flex-shrink-0 bg-white transition-all duration-300 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
              key={product._id}
            >
              <ProductItem
                isFixedWidth={true}
                data={product}
                token={token}
                onAddOrRemoveFavorite={addOrRemoveFavorite}
              />
            </li>
          ))}
        </ExploreProducts>
        {/* <section className="flex flex-col gap-3 items-center py-4">
          <h3 className="text-xl font-semibold">
            See personalized recommendations
          </h3>
          <button className="py-1 px-6 bg-[#18403C] rounded-lg text-white">
            Sign in
          </button>
          <div>
            New Customer?{" "}
            <a className="cursor-pointer text-blue-800 hover:underline text-sm">
              Sign up
            </a>
          </div>
        </section> */}
        {successMessage.add && (
          <Alert severity="success" className="fixed bottom-4 right-4 z-50">
            {successMessage.add}
          </Alert>
        )}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
