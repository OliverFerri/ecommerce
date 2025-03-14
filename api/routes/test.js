// ========================================================
// ========================================================
// ========================================================

router.put("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ========================================================
// ========================================================
// ========================================================

const handleRatingChange = (newRating) => {
  setRating(newRating);
  setReview(rating);
};

import PropTypes from "prop-types";
import { useState } from "react";
import Star from "./Star";

const StarRating = ({ maxRating = 5, type, userRating, setReview }) => {
  StarRating.propTypes = {
    maxRating: PropTypes.number,
    type: PropTypes.string,
    userRating: PropTypes.number,
    setReview: PropTypes.func,
  };
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setReview(rating);
  };

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          index={index}
          rating={type !== "user-rating" ? rating : userRating}
          onClick={() => handleRatingChange(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
