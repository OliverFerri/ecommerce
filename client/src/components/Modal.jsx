import PropTypes from "prop-types";
import ReviewForm from "./ReviewForm";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({
  handleChange,
  handleEditSubmit,
  rating,
  setRating,
  handleClose,
}) => {
  Modal.propTypes = {
    handleChange: PropTypes.func,
    handleEditSubmit: PropTypes.func,
    rating: PropTypes.number,
    setRating: PropTypes.func,
    handleClose: PropTypes.func,
  };
  return (
    <div className="w-250px border-2 w-[550px] m-auto border-teal-400 rounded-xl relative">
      <ReviewForm
        onChange={handleChange}
        onClick={handleEditSubmit}
        rating={rating}
        setRating={setRating}
      />
      <CloseIcon onClick={handleClose} className="absolute top-5 left-5" />
    </div>
  );
};

export default Modal;
