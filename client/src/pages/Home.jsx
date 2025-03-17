import { useEffect, useState } from "react";
import ProductTile from "../components/ProductTile";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/calls/productApiCalls";
import { getUserCart } from "../redux/calls/cartApiCalls";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const currentUser = useSelector((state) => state.users.currentUser);

  const [avgScores, setAvgScores] = useState({});

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    currentUser ? getUserCart(currentUser._id, dispatch) : "";
  }, [currentUser, dispatch]);

  useEffect(() => {
    const fetchAvgScores = async () => {
      try {
        const scores = {};
        for (const product of products) {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND}/api/reviews/average?pid=${
              product._id
            }`
          );
          scores[product._id] = res.data.averageScore;
        }
        setAvgScores(scores);
      } catch (error) {
        console.log("Error fetching average scores:", error);
      }
    };

    if (products.length > 0) {
      fetchAvgScores();
    }
  }, [products]);

  return (
    <div className="flex justify-center w-[92%] m-auto p-5 h-[calc(100vh-4.5rem)] bg-[#141414] border-teal-900 border-r-1 border-l-1">
      <div className="grid sm:grid-cols-3 md:grid-cols-4 grid-cols-7">
        {products.map((item) => (
          <NavLink key={item._id} to={"/products/" + item._id}>
            <ProductTile
              title={item.title}
              img={item.img}
              price={item.price}
              score={avgScores[item._id] || 0}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
