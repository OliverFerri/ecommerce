import PropTypes from "prop-types";
import Star from "./Star";

const StarRating = ({ maxRating = 5, type, userRating, setRating, rating }) => {
  StarRating.propTypes = {
    maxRating: PropTypes.number,
    type: PropTypes.string,
    userRating: PropTypes.number,
    setReview: PropTypes.func,
    setRating: PropTypes.func,
    rating: PropTypes.number,
  };

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          index={index}
          rating={type !== "user-rating" ? rating : userRating}
          onClick={() => setRating(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
