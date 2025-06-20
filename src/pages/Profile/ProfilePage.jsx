import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import "./ProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import ExploreProducts from "../../components/ExploreProducts/ExploreProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
const Profile = ({ addOrRemoveFavorite, products, token }) => {
  const [profile] = useState({
    name: "OUTFITTOMORROW",
    location: "Dubai, United Arab Emirates",
    avatar:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description:
      "Shop for women's, men's and kids' fashion, beauty and home essentials online! We offer quality styles at the best price and in a sustainable way.",
    followers: "1,234",
    following: "523",
    reviews: "312",
    rating: "4.8",
  });

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const { id: userId } = useParams();

  const getProfileData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.data) {
        setUserData(data.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [userId]);

  const handleProductsWithoutFilter = () => {
    navigate("/products");
  };

  //   const [activeTab, setActiveTab] = useState('addresses');

  return (
    <div className="min-h-screen">
      {/* {activeTab === 'profile' ? ( */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center mb-6">
              <div className="h-32 w-32 rounded-full overflow-hidden">
                {/* <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                /> */}
                <img
                  src={
                    userData?.avatar ===
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPwA="
                      ? "../../../../public/profile.jpg"
                      : userData?.avatar
                  }
                  alt="image"
                  className="rounded-full "
                />
              </div>
            </div>

            {/* <div className="flex justify-center gap-8 text-center mb-6"> */}
            {/* <div>
                <p className="text-xl font-bold">{userData.followers}</p>
                <p className="text-gray-600">Followers</p>
              </div> */}
            {/* <div>
                <p className="text-xl font-bold">{profile.following}</p>
                <p className="text-gray-600">Following</p>
              </div>
              <div>
                <p className="text-xl font-bold">{profile.reviews}</p>
                <p className="text-gray-600">Reviews</p>
              </div> */}
            {/* </div> */}

            {/* <div className="flex justify-center items-center gap-2 mb-2">
              <div className="flex items-center">
                <p className="font-bold text-xl mr-2">{profile.rating}</p>
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              </div>
            </div> */}

            <div className="text-center mb-3">
              {/* <h2 className="text-2xl font-bold mb-1">
                {userData.firstName} {userData.lastName}
              </h2> */}
              <span className="text-lg font-bold mr-1">Name: </span>
              <span className="text-base font-medium">
                {userData?.firstName} {userData?.lastName}
              </span>
            </div>

            <div className="text-center mb-4">
              <span className="text-lg font-bold mr-1">Role: </span>
              <span className="text-base font-medium">{userData?.role}</span>
            </div>

            {/* <p className="text-center max-w-2xl mx-auto mb-6">
              {profile.description}
            </p> */}

            {/* <div className="flex justify-center">
                <button className="button-primary w-full max-w-xs">
                  FOLLOW
                </button>
              </div> */}
          </div>
        </div>

        <ExploreProducts
          onClickSeeMore={handleProductsWithoutFilter}
          title={"Products"}
          header={`${userData?.firstName}'s Products`}
        >
          {products.slice(10, 20).map((product) => (
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

        {/* <div className="max-w-4xl mx-auto mt-8">
          <div className="flex border-b mb-4">
            <button className="py-2 px-4 font-medium border-b-2 border-loope-primary text-loope-primary">
              Products
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6">Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array(5)
              .fill()
              .map((_, i) => (
                <div key={i} className="card">
                  <div className="aspect-square overflow-hidden rounded-md mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Headphones"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-medium">HeadPhones</h3>
                  <p className="font-bold">42.80$</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">618</span>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <button className="p-2 border rounded-full">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button className="p-2 border rounded-full">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Profile;
