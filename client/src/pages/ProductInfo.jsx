import axios from "axios";
import Button from "../components/Button";
import StarRating from "../components/start-rating/StarRating";
import Reviews from "../components/Reviews";
import ReviewForm from "../components/ReviewForm";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../redux/calls/cartApiCalls";
import Modal from "../components/Modal";
// import { token } from "../token";

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewUsers, setReviewUsers] = useState([]);
  const [avgScore, setAvgScore] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const userId = useSelector((state) => state.users.currentUser?._id);
  const product = useSelector((state) =>
    state.products.products.find((item) => item._id === productId)
  );
  const userCart = useSelector((state) => state.cart.carts);

  const userIndex = reviewUsers.findIndex((item) => item._id === userId);

  const [newReview, setNewReview] = useState({
    userId: userId,
    productId: productId,
    score: 0,
    content: "",
  });

  const cartProduct = {
    productId: productId,
    quantity: quantity,
    price: product.price,
  };

  const editedReview = {
    productId: productId,
    score: newReview.score,
    content: newReview.content,
  };

  const cart = {
    userId: userId,
    numInCart: 1,
    products: [cartProduct],
  };

  useEffect(() => {
    getUserCart(userId, dispatch);
  }, [userId, dispatch]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews`);
        setReviews(res.data.filter((item) => item.productId === productId));
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, [productId]);

  useEffect(() => {
    const getReviewUsers = async () => {
      try {
        const res = await axios.get(`/api/users`);

        const filterUsers = reviews.map((item) => item.userId);

        setReviewUsers(
          res.data.filter((item) => filterUsers.includes(item._id))
        );
      } catch (error) {
        console.log(error);
      }
    };
    getReviewUsers();
  }, [reviews]);

  const handleCounter = (type) => {
    if (type === "increment") {
      quantity < product.stock ? setQuantity(quantity + 1) : product.stock;
    } else if (type === "decrement") {
      quantity > 1 ? setQuantity(quantity - 1) : 1;
    }
  };

  useEffect(() => {
    const getAvg = async () => {
      try {
        const res = await axios.get(`/api/reviews/average?pid=${productId}`);
        setAvgScore(res.data.averageScore);
      } catch (error) {
        console.log(error);
      }
    };
    getAvg();
  }, [productId]);

  const handleAddToCart = () => {
    !userCart
      ? addToCart(cart, dispatch)
      : updateCart(userCart.userId, cartProduct, dispatch);

    getUserCart(userId, dispatch);
  };

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (userIndex > 0) {
      alert("You have already submitted a review.");
      return;
    }
    try {
      const res = await axios.post("/api/reviews", newReview);
      setReviews((prevReviews) => [...prevReviews, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEdit = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/reviews/${id}`, editedReview);
      setReviews((prevReviews) =>
        prevReviews.map((review) => (review.userId === id ? res.data : review))
      );
      console.log("data:", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const handleStarRating = (newRating) => {
    setNewReview({ ...newReview, score: newRating });
  };

  return (
    <>
      <div className="w-[92%] m-auto p-5 h-[calc(100%-4.5rem)] bg-[#141414] border-teal-900 border-r-1 border-l-1">
        <div className="flex">
          <div className=" w-100 flex-1">
            <img
              src="https://img.game8.co/4041217/bf5ceed7441274ac7c22aef0138e7efd.png/show"
              alt=""
            />
          </div>
          <div className="flex-2 px-20">
            <div className="text-4xl font-extrabold">{product.title}</div>
            <div>
              <StarRating maxRating={5} rating={Math.floor(avgScore)} />
            </div>
            <div className="py-10">{product.desc}</div>
            <div className="text-2xl">${product.price}</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5 border-1 border-[#353535]">
              <div
                onClick={() => handleCounter("decrement")}
                className="border-r-1 p-3 border-[#353535] hover:bg-[#303030] hover:text-teal-400 cursor-pointer"
              >
                <RemoveIcon />
              </div>
              <div className="text-2xl">{quantity}</div>
              <div
                onClick={() => handleCounter("increment")}
                className="border-l-1 p-3 border-[#353535] hover:bg-[#303030] hover:text-teal-400 cursor-pointer"
              >
                <AddIcon />
              </div>
            </div>
            {product.stock > 0 ? (
              <Button text="Add to Cart" onClick={handleAddToCart} />
            ) : (
              <div className="text-2xl font-extralight">Out of Stock</div>
            )}
          </div>
        </div>
        <div className="py-20"></div>
        <hr />
        <ReviewForm
          onChange={handleChange}
          onClick={handleReviewSubmit}
          rating={newReview.score}
          setRating={handleStarRating}
        />
        {reviews.map((review) => (
          <Reviews
            key={review._id}
            content={review.content}
            createdAt={format(review.createdAt)}
            avatar={
              reviewUsers[
                reviewUsers.findIndex((item) => item._id === review.userId)
              ]?.img
            }
            name={
              reviewUsers[
                reviewUsers.findIndex((item) => item._id === review.userId)
              ]?.username
            }
            rating={review.score}
            currentUserId={userId}
            reviewUserId={review.userId}
            openEditModal={openModal}
          />
        ))}
        {openEditModal && (
          <Modal
            handleClose={openModal}
            handleChange={handleChange}
            rating={newReview.score}
            setRating={handleStarRating}
            handleEditSubmit={(e) => handleSubmitEdit(e, userId)}
          />
        )}
      </div>
    </>
  );
};

export default ProductInfo;
