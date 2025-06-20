import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryPage from "./pages/category/CategoryPage";
import HomePage from "./pages/home/HomePage";
import Login from "./authentication/Login/Login";
import ProductPage from "./pages/product/ProductPage";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import AddProductPage from "./pages/AddProduct/AddProductPage";
import CartPage from "./pages/Cart/CartPage";
import ForgotPassword from "./authentication/forgotPass/ForgotPasswordContainer";
import CategoriesPage from "./pages/categories/CategoriesPage";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import RegisterContainer from "./authentication/Register/RegisterContainer";
import Profile from "./pages/Profile/profilePage";
import SavedAddresses from "./pages/AccountSettings/SavedAddresses";
import MySalesPage from "./pages/Profile/MySales/MySalesPage";
import PendingSalesRequests from "./pages/Profile/SalesRequists/Pending/PendingSalesRequests";
import SavedItemsPage from "./pages/SavedItems/SavedItemsPage";

import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound/NotFound";

const URL = "http://localhost:3000";

function AppContent() {
  const location = useLocation();
  const definedRoutes = [
    "/",
    "/category/:id",
    "/categories",
    "/register",
    "/login",
    "/product/:id",
    "/add",
    "/cart",
    "/forgotpass",
    "/account-settings",
    "/products",
    "/profile",
    "/saved-addresses",
    "/mysales",
    "/sales-requests",
  ];

  // Check if current path matches any defined route
  const isDefinedRoute = definedRoutes.includes(location.pathname);

  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgotpass" ||
    !isDefinedRoute;
  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("ecom_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("ecom_token");
    return saved ? JSON.parse(saved) : null;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("ecom_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Products state
  const [products, setProducts] = useState([]);
  const [productsWithFavorites, setProductsWithFavorites] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [brands, setBrands] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState({
    products: false,
    categories: false,
    user: false,
    add: false,
    updateData: {
      accountDetails: false,
      address: false,
      password: false,
      email: false,
    },
  });
  const [error, setError] = useState({
    products: null,
    categories: null,
    auth: null,
    add: null,
    updateData: {
      accountDetails: null,
      address: null,
      password: null,
      email: null,
    },
  });

  const [successMessage, setSuccessMessage] = useState({
    accountDetails: null,
    address: null,
    password: null,
    email: null,
    add: null,
  });

  const navigate = useNavigate();

  // Save to localStorage when state changes
  useEffect(
    () => localStorage.setItem("ecom_user", JSON.stringify(user)),
    [user]
  );
  useEffect(
    () => localStorage.setItem("ecom_token", JSON.stringify(token)),
    [token]
  );
  useEffect(
    () => localStorage.setItem("ecom_cart", JSON.stringify(cart)),
    [cart]
  );

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`${URL}/api/categories/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);
        setCategories(data);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    // Check URL for token
    const queryParams = new URLSearchParams(window.location.search);
    const authToken = queryParams.get("token");
    const authUser = queryParams.get("user");

    if (authToken) {
      // Store the token in state
      setToken(authToken);
      // console.log();
      setUser(JSON.parse(authUser));

      navigate(window.location.pathname);
    }
  }, [navigate]);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await fetch(`${URL}/api/brands/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);
        setBrands(data);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    };
    getBrands();
  }, []);

  // get products
  const getProducts = async () => {
    try {
      const response = await fetch(`${URL}/api/products/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.data) {
        setProducts(data.data);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getFavorites = async () => {
    if (token) {
      try {
        const response = await fetch(`${URL}/api/favorites/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);
        setFavoriteProducts(data);
        setFavoriteProductIds(data.map((fav) => fav.productId._id));

        // setProducts(productsWithFavorites);

        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const addOrRemoveFavorite = async (id, isRemove) => {
    if (isRemove) {
      try {
        const response = await fetch(`${URL}/api/favorites/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: id,
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);

        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      } finally {
        setTimeout(() => {
          getFavorites();
        }, 500);
      }
    } else {
      try {
        const response = await fetch(`${URL}/api/favorites/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: id,
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);

        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      } finally {
        setTimeout(() => {
          getFavorites();
        }, 500);
      }
    }
  };

  useEffect(() => {
    setProductsWithFavorites(
      products.map((product) => ({
        ...product,
        isFavorite: favoriteProductIds.includes(product._id),
      }))
    );
  }, [products, favoriteProductIds]);

  const getCart = async () => {
    if (token) {
      try {
        const response = await fetch(`${URL}/api/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.data) {
          setCart(data.data);
        }
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const addToCart = async (productData) => {
    try {
      const response = await fetch(`${URL}/api/cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();

      getCart();
      navigate("/cart");

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Auth functions
  const login = async (userData) => {
    setIsLoading((prev) => ({ ...prev, user: true }));
    try {
      const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);
      setUser(data.user);
      setToken(data.user.token);
      setError((prev) => ({ ...prev, auth: null }));
      navigate("/");
      return { success: true };
    } catch (err) {
      setError((prev) => ({ ...prev, auth: err.message }));
      return { success: false, error: err.message };
    } finally {
      setIsLoading((prev) => ({ ...prev, user: false }));
    }
  };

  const signWithGoogle = async (userData) => {
    // setIsLoading((prev) => ({ ...prev, user: true }));
    window.location.href = `${URL}/auth/google`;
  };

  const register = async (userData, setLoading) => {
    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("role", userData.role);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }
    formData.append("phone", userData.phone ? userData.phone : "");
    formData.append("date", userData.date ? userData.date : "");
    formData.append("city", userData.city ? userData.city : "");
    formData.append("street", userData.street ? userData.street : "");
    formData.append("flat", userData.flat ? userData.flat : "");

    if (setLoading) {
      setIsLoading((prev) => ({ ...prev, user: true }));
    }
    try {
      const response = await fetch(`${URL}/api/auth/Register`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser(data.user);
      setToken(data.user.token);
      setError((prev) => ({ ...prev, auth: null }));
      navigate("/");
      return { success: true };
    } catch (err) {
      setError((prev) => ({ ...prev, auth: err.message }));
      return { success: false, error: err };
    } finally {
      if (setLoading) {
        setIsLoading((prev) => ({ ...prev, user: false }));
      }
    }
  };

  const logout = () => {
    navigate("/");
    setUser(null);
    setToken(null);
    setCart([]);
  };

  const updateUserData = async (userData, changed) => {
    const formData = new FormData();

    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("phone", userData.phone);
    formData.append("date", userData.date);
    formData.append("city", userData.city);
    formData.append("street", userData.street);
    formData.append("flat", userData.flat);

    setIsLoading((prev) => ({
      ...prev,
      updateData: { ...prev.updateData, [changed]: true },
    }));
    try {
      const response = await fetch(`${URL}/api/users/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);
      setUser(data.data);
      setError((prev) => ({
        ...prev,
        updateData: { ...prev.updateData, [changed]: null },
      }));
      setSuccessMessage((prev) => ({
        ...prev,
        [changed]: "Great! Your profile has been updated.",
      }));
      return { success: true };
    } catch (err) {
      setError((prev) => ({
        ...prev,
        updateData: { ...prev.updateData, [changed]: err.message },
      }));
      return { success: false, error: err.message };
    } finally {
      setTimeout(() => {
        setSuccessMessage((prev) => ({
          ...prev,
          [changed]: null,
        }));
      }, 5000);
      setIsLoading((prev) => ({
        ...prev,
        updateData: { ...prev.updateData, [changed]: false },
      }));
    }
  };

  const addProduct = async (data) => {
    const formData = new FormData();
    // Only append if `size` exists and is not empty
    if (data.size && data.size.length > 0) {
      formData.append("size", data.size);
    }

    // Only append if `colors` exists and is not empty
    if (data.colors && data.colors.length > 0) {
      formData.append(
        "colors",
        data.colors.map((color) => color.hex)
      );
    }

    // Append images (if multiple)
    if (data.img && data.img.length > 0) {
      for (let i = 0; i < data.img.length; i++) {
        formData.append("img", data.img[i]);
      }
    }

    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("stock_quantity", Number(data.stock_quantity));
    formData.append("condition", data.condition);
    formData.append("description", data.description);
    formData.append("isNegotiable", data.isNegotiable);
    formData.append("category", data.category._id);
    formData.append("sellerId", data.sellerId);
    formData.append("Brand", data.Brand._id);

    setIsLoading((prev) => ({
      ...prev,
      add: true,
    }));
    try {
      const response = await fetch(`${URL}/api/products/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);
      // setUser(data.data);
      setError((prev) => ({
        ...prev,
        add: null,
      }));
      setSuccessMessage((prev) => ({
        ...prev,
        add: "Great! You added your product successfully.",
      }));
      return { success: true };
    } catch (err) {
      setError((prev) => ({
        ...prev,
        add: err.message,
      }));
      return { success: false, error: err.message };
    } finally {
      setTimeout(() => {
        setSuccessMessage((prev) => ({
          ...prev,
          add: null,
        }));
      }, 5000);
      setIsLoading((prev) => ({
        ...prev,
        add: false,
      }));

      navigate("/");
    }
  };

  // Cart functions
  // const addToCart = (product, quantity = 1) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === product.id);

  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + quantity }
  //           : item
  //       );
  //     }

  //     return [...prevCart, { ...product, quantity }];
  //   });
  // };

  const removeFromCart = async (productId) => {
    setIsLoading((prev) => ({ ...prev, page: true }));
    try {
      const response = await fetch(`${URL}/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      // const newCart = cart.cartItem.filter(
      //   (item) => item.productId._id !== productId
      // );
      // setCart(newCart);
      return { success: true };
    } catch (err) {
      // setError((prev) => ({ ...prev, auth: err.message }));
      return { success: false, error: err.message };
    } finally {
      setTimeout(() => {
        getCart();
      }, 1000);
      setIsLoading((prev) => ({ ...prev, page: false }));
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    setIsLoading((prev) => ({ ...prev, page: true }));
    try {
      const body = {
        quantity: newQuantity,
      };
      const response = await fetch(`${URL}/api/cart/${productId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);
      getCart();
      return { success: true };
    } catch (err) {
      // setError((prev) => ({ ...prev, auth: err.message }));
      return { success: false, error: err.message };
    } finally {
      setIsLoading((prev) => ({ ...prev, page: false }));
    }
  };

  // const clearCart = () => setCart([]);

  // Calculate cart totals
  // const cartTotal = cart.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  const cartItemCount = cart?.cartItem?.length ? cart.cartItem.length : null;

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading((prev) => ({ ...prev, products: true, categories: true }));
      try {
        // Fetch products
        // const productsResponse = await fetch("/api/products");
        // const productsData = await productsResponse.json();
        // setProducts(productsData.products);
        // Fetch categories
        // const categoriesResponse = await fetch("/api/categories");
        // const categoriesData = await categoriesResponse.json();
        // setCategories(categoriesData);
        // setError({ products: null, categories: null });
      } catch (err) {
        // setError({ products: err.message, categories: err.message });
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          products: false,
          categories: false,
        }));
      }
    };

    fetchData();
  }, []);

 
  return (
    <>
      {!hideHeaderFooter && (
        <Header
          user={user}
          onLogout={logout}
          cartItemCount={cartItemCount}
          categories={categories}
        />
      )}

      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={productsWithFavorites}
              token={token}
              addOrRemoveFavorite={addOrRemoveFavorite}
              isLoading={isLoading.products}
              error={error.products}
            />
          }
        />
        <Route
          path="/category/:id"
          element={
            <CategoryPage
              categories={categories}
              brands={brands}
              products={productsWithFavorites}
              token={token}
              addOrRemoveFavorite={addOrRemoveFavorite}
              isLoading={isLoading.categories}
              error={error.categories}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <CategoriesPage
              categories={categories}
              isLoading={isLoading.categories}
              error={error.categories}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterContainer
              onRegister={register}
              isLoading={isLoading.user}
              error={error.auth}
              onSignWithGoogle={signWithGoogle}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onLogin={login}
              isLoading={isLoading.user}
              error={error.auth}
              onSignWithGoogle={signWithGoogle}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductPage
              categories={categories}
              brands={brands}
              addOrRemoveFavorite={addOrRemoveFavorite}
              products={productsWithFavorites}
              addToCart={addToCart}
              token={token}
              isLoading={isLoading.products}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddProductPage
              categories={categories}
              brands={brands}
              onAddOrRemoverFavorite={addProduct}
              user={user}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              cartItemCount={cartItemCount}
              onRemoveFromCart={removeFromCart}
              onUpdateQuantity={updateCartItemQuantity}
              user={user}
              token={token}
            />
          }
        />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route
          path="/account-settings"
          element={
            <AccountSettings
              user={user}
              onUpdateUserData={updateUserData}
              error={error.updateData}
              successMessage={successMessage}
              isLoading={isLoading.updateData}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductsPage
              categories={categories}
              brands={brands}
              addOrRemoveFavorite={addOrRemoveFavorite}
              products={productsWithFavorites}
              token={token}
              isLoading={isLoading.categories}
              error={error.categories}
            />
          }
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/saved-addresses" element={<SavedAddresses />} />
        <Route path="/mysales" element={<MySalesPage />} />
        <Route path="/sales-requests" element={<PendingSalesRequests />} />
        {/* <Route path="/sales-requests" element={<SalesRequests />} /> */}
        <Route
          path="/saved-items"
          element={
            <SavedItemsPage 
            favoriteProducts={favoriteProducts} 
            setFavoriteProducts={setFavoriteProducts} 
            addOrRemoveFavorite={addOrRemoveFavorite}
            addToCart={addToCart}/>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
