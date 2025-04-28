import Button from "@mui/material/Button";
import ExploreProducts from "../../components/ExploreProducts/ExploreProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
import Card from "./Card";
import Header from "../../layout/Header/Header";
// import Footer from "./Footer";
import "./HomePage.css";

function HomePage() {
  const products = [
    {
      id: 1,
      title: "Wireless Headphones lsdfjaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      price: "129.99 AED",
      description:
        "Premium noise-cancelling wireless headphones with 30-hour battery life.",
      rate: 4,
      image: "cards/card1.png",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: "199.99 AED",
      description:
        "Fitness tracker with heart rate monitor, GPS, and 7-day battery life.",
      rate: 3,
      image: "cards/card2.webp",
    },
    {
      id: 3,
      title: "Smartphone Pro",
      price: "899.99 AED",
      description:
        'Latest flagship smartphone with 6.7" display and 108MP camera.',
      rate: 2,
      image: "cards/card8.png",
    },
    {
      id: 4,
      title: "Laptop Ultra",
      price: "499.99 AED",
      description:
        "Powerful laptop with 16GB RAM, 1TB SSD and dedicated graphics.",
      rate: 5,
      image: "cards/card4.webp",
    },
    {
      id: 5,
      title: "Bluetooth Speaker",
      price: "79.99 AED",
      description:
        "Waterproof Bluetooth speaker with 360° sound and 12-hour playback.",
      rate: 1,
      image: "cards/card5.png",
    },
    {
      id: 6,
      title: "Coffee Maker",
      price: "149.99 AED",
      description:
        "Smart coffee maker with programmable brewing and temperature control.",
      rate: 4,
      image: "cards/card6.png",
    },
    {
      id: 7,
      title: "Drone Camera",
      price: "349.99 AED",
      description:
        "HD drone with 4K camera, 30-minute flight time and obstacle avoidance.",
      rate: 2,
      image: "cards/card7.png",
    },
    {
      id: 8,
      title: "Gaming Console",
      price: "499.99 AED",
      description:
        "Next-gen gaming console with 1TB storage and 4K gaming capabilities.",
      rate: 1,
      image: "cards/card8.png",
    },
  ];

  const cards = [
    { id: 1, title: "woman", imageSrc: "cards/card5.png" },
    { id: 2, title: "man", imageSrc: "cards/card4.webp" },
    { id: 3, title: "phone", imageSrc: "cards/card7.png" },
    { id: 4, title: "laptop", imageSrc: "cards/card8.png" },
    { id: 5, title: "Head Phone", imageSrc: "cards/card2.webp" },
    { id: 6, title: "Bag", imageSrc: "cards/card6.png" },
    { id: 7, title: "toys", imageSrc: "cards/card1.png" },
  ];

  return (
    // <div className="container mx-auto">
    <div>
      <main className="mx-2 sm:mx-3 md:mx-6">
        <section className="grid grid-cols-8 gap-5 m-2 h-[50vh]">
          <a className="ad cursor-pointer col-span-8 lg:col-span-6 relative rounded-lg overflow-hidden grid grid-cols-2 bg-[#bac2c2] hover:shadow-lg">
            <div className="col-span-1 flex justify-center items-center flex-col gap-5">
              <h2 className="text-4xl">Get the looks!</h2>
              <p className="w-3/4 text-center">
                Chic pieces and accessories to liven up your wardrobe
              </p>
              <Button
                variant="contained"
                className="!bg-[#18403C] !rounded-2xl"
              >
                Contained
              </Button>
            </div>
            <figure className="relative flex justify-center items-center">
              <img
                src="man3.jpg"
                alt="Man clothe"
                className="absolute w-[120%]"
              />
            </figure>
          </a>
          <a className="max-lg:hidden lg:col-span-2 cursor-pointer rounded-lg overflow-hidden hover:shadow-lg">
            <img src="woman.jpg" alt="Man clothe" className="h-full w-full" />
          </a>
        </section>
        <ExploreProducts
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
        </ExploreProducts>
        <ExploreProducts title={"Best Sales"} header={"Explore Our Products"}>
          {products.map((product) => (
            <li
              className="p-2 bg-white rounded-lg hover:shadow-xl cursor-pointer"
              key={product.id}
            >
              <ProductItem isFixedWidth={true} data={product} />
            </li>
          ))}
        </ExploreProducts>
        <ExploreProducts
          title={"Best Deals"}
          header={"Deals below 250 EGP | Let's save!"}
        >
          {products.map((product) => (
            <li
              className="p-2 bg-white rounded-lg hover:shadow-xl cursor-pointer"
              key={product.id}
            >
              <ProductItem isFixedWidth={true} data={product} />
            </li>
          ))}
        </ExploreProducts>
        <section className="flex flex-col gap-3 items-center py-4">
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
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
