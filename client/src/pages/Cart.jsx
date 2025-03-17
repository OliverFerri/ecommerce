import axios from "axios";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import StripeCheckout from "react-stripe-checkout";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserCart, updateCart } from "../redux/calls/cartApiCalls";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.carts?.products);
  const userId = useSelector((state) => state.users.currentUser?._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [stripeToken, setStripeToken] = useState(null);

  const tax = 1.0825;
  const totalWithTax = total * tax;

  const KEY = import.meta.env.VITE_STRIPE_KEY;

  useEffect(() => {
    getUserCart(userId, dispatch);
  }, [userId, dispatch]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/products`
        );

        // Create a lookup map for quantities from cartProducts
        const cartMap = cartProducts.reduce((acc, item) => {
          acc[item.productId] = item.quantity;
          return acc;
        }, {});

        // Filter and add quantity field to matched products
        const updatedProducts = res.data
          .filter((item) => cartMap[item._id]) // Keep only products in cart
          .map((item) => ({
            ...item,
            quantity: cartMap[item._id] || 0, // Merge quantity from cart
          }));

        setProducts(updatedProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cartProducts]);

  useEffect(() => {
    const cost = products.map((product) => product.quantity * product.price);
    const sum = cost.reduce((a, b) => a + b, 0);
    setTotal(sum);
  }, [products]);

  const handleRemove = (prodId) => {
    let prod = products[products.findIndex((item) => item._id === prodId)];

    const newCartQuantity = {
      productId: prod._id,
      quantity: 0,
      price: products.price,
    };

    updateCart(userId, newCartQuantity, dispatch);

    setProducts(products.filter((item) => item._id !== prodId));
  };

  const handleUpdateQuantity = (e, prodId) => {
    const newQuantity = Number(e.target.value);

    const updatedProducts = products.map((product) =>
      product._id === prodId ? { ...product, quantity: newQuantity } : product
    );

    setProducts(updatedProducts);
  };

  const handleConfirmUpdate = (prodId) => {
    let prod = products[products.findIndex((item) => item._id === prodId)];

    const newCartQuantity = {
      productId: prod._id,
      quantity: prod.quantity,
      price: products.price,
    };

    updateCart(userId, newCartQuantity, dispatch);
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/checkout/payment`,
          {
            tokenId: stripeToken.id,
            amount: totalWithTax.toFixed(2) * 100,
          }
        );
        navigate(`/checkout/success`, {
          state: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && total >= 1 && makeRequest();
  }, [stripeToken, total, totalWithTax, navigate]);

  return (
    <div className="w-[75%] m-auto flex justify-between  h-[calc(100vh-4.5rem)] bg-[#141414] border-teal-900 border-r-1 border-l-1">
      <div className="px-[20px]">
        <div className="py-5 text-3xl font-extralight">Your Cart</div>
        {products.map((product) => (
          <CartItem
            key={product._id}
            name={product.title}
            quantity={product.quantity}
            price={product.price}
            handleRemove={() => handleRemove(product._id)}
            confirmUpdate={() => handleConfirmUpdate(product._id)}
            onChange={(e) => handleUpdateQuantity(e, product._id)}
          />
        ))}
      </div>
      <div className="p-5 text-3xl font-extralight">
        Cart Information
        <div className="h-[300px] w-[400px] border-teal-900 border-1 mt-5">
          <div className="flex justify-between p-5 border-b-1 border-teal-900">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between p-5">
            <span>Tax</span>
            <span>${totalWithTax.toFixed(2)}</span>
          </div>
          <hr className="border-1 border-teal-900" />
          <div className="flex justify-between p-5">
            <span>Final Cost</span>
            <span>${totalWithTax.toFixed(2)}</span>
          </div>
          <div className="p-5">
            <StripeCheckout
              name="Shop Store"
              image="https://i.ytimg.com/vi/hu-0r_rXNM0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC6M5M-q9eQJE83umOWlxkY7oD58A"
              billingAddress
              shippingAddress
              description={`Your total is $${totalWithTax.toFixed(2)}`}
              amount={totalWithTax.toFixed(2) * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button Icon={LockIcon} text="Checkout" />
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
