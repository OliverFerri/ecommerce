import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductInfo from "./pages/ProductInfo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import UserInfo from "./pages/UserInfo";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
// import { localUserData } from "./redux/localStorage";

function App() {
  const location = useLocation();
  const login =
    location.pathname === "/login" || location.pathname === "/register";

  // const user = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:root")).users
  // )?.currentUser;

  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <>
      {!login && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={currentUser ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<ProductInfo />} />
        <Route
          path="/users/:userId"
          element={!currentUser ? <Navigate to={"/login"} /> : <UserInfo />}
        />
        <Route path="/cart/:userId" element={<Cart />} />
        <Route
          path="/checkout/success"
          element={
            !currentUser ? <Navigate to={"/login"} /> : <CheckoutSuccess />
          }
        />
      </Routes>
    </>
  );
}

export default App;
