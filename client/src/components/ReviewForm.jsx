import PropTypes from "prop-types";
import Button from "./Button";
import StarRating from "./start-rating/StarRating";

const ReviewForm = ({ setReview, onChange, onClick, rating, setRating }) => {
  ReviewForm.propTypes = {
    setReview: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    rating: PropTypes.number,
    setRating: PropTypes.func,
  };
  return (
    <div className="m-auto w-[50%] mb-5">
      <div>Write a review</div>
      <div>
        <StarRating
          setReview={setReview}
          setRating={setRating}
          rating={rating}
        />
      </div>
      <div>
        <textarea
          name="content"
          id=""
          className="field-sizing-content bg-[#303030] w-[100%] min-h-20 px-1 text-teal-400"
          onChange={onChange}
        ></textarea>
      </div>
      <div className="flex flexe w-[25%]">
        <Button text="Submit" onClick={onClick} />
      </div>
    </div>
  );
};

export default ReviewForm;
