import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./authentication/SignUp/SignUp";
import CategoryPage from "./pages/category/CategoryPage";
import HomePage from "./pages/home/HomePage";
import SignIpPage from "./authentication/SignIn/SignInPage";
import ProductPage from "./pages/product/ProductPage";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import AddProductPage from "./pages/AddProduct/AddProductPage";
import CartPage from "./pages/Cart/CartPage";
import ForgotPassword from "./authentication/forgotPass/ForgotPasswordContainer";
import CategoriesPage from "./pages/categories/CategoriesPage";

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgotpass";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIpPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
