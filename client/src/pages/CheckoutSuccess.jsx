import { NavLink, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const CheckoutSuccess = () => {
  const location = useLocation();
  const stripeData = location.state;
  const userCart = useSelector((state) => state.cart.carts);
  const userId = useSelector((state) => state.users.currentUser._id);
  const [orderId, setOrderId] = useState(null);

  //   console.log("cart", userCart);

  useEffect(() => {
    const newOrder = {
      userId: userId,
      products: [
        userCart.products.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      ],
      total: stripeData.amount,
    };

    const getOrder = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/orders`,
          newOrder
        );
        setOrderId(res.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [stripeData.amount, userCart.products, userId]);

  useEffect(() => {
    if (!userId) return;

    const clearCart = async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND}/api/cart/${userId}`
        );
      } catch (error) {
        console.log(error);
      }
    };

    clearCart();
  }, [userId]);

  console.log("order: ", orderId);

  console.log(stripeData);

  return (
    <div className="flex h-[800px] justify-center items-center">
      <div className="flex flex-col h-50 w-100 p-5 justify-center items-center bg-[#141414] border-2 border-[#404040] rounded-sm">
        <div className="pb-5">
          Order Complete! Your order number is {orderId}
        </div>
        <div>
          <NavLink to={"/"}>
            <Button text="Continue Shopping" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
