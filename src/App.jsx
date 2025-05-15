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
import SaleRequests from "./pages/Profile/SalesRequists/SalesRequests";

const URL = "http://localhost:3000";

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgotpass";

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
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
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
    }
  };

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

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
      const newCart = cart.cartItem.filter(
        (item) => item.productId._id !== productId
      );
      setCart(newCart);
      return { success: true };
    } catch (err) {
      // setError((prev) => ({ ...prev, auth: err.message }));
      return { success: false, error: err.message };
    } finally {
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

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
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
              products={products}
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
            />
          }
        />
        <Route
          path="/product"
          element={
            <ProductPage
              products={products}
              onAddToCart={addToCart}
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
              onAdd={addProduct}
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved-addresses" element={<SavedAddresses />} />
        <Route path="/mysales" element={<MySalesPage />} />
        <Route path="/sales-requests" element={<SaleRequests />} />
      </Routes>

      <p>test</p>

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
