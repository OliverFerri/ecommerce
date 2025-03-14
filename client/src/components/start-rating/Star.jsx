import PropTypes from "prop-types";

const Star = ({ index, rating, onClick }) => {
  Star.propTypes = {
    index: PropTypes.number,
    rating: PropTypes.number,
    onClick: PropTypes.func,
  };
  return (
    <span
      className={`cursor-pointer text-2xl ${
        index < rating ? "text-amber-400" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      ★
    </span>
  );
};

export default Star;
