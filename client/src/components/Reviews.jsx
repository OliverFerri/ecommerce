import PropTypes from "prop-types";
import StarRating from "./start-rating/StarRating";
// import { useState } from "react";

const Reviews = ({
  avatar,
  name,
  rating,
  createdAt,
  content,
  currentUserId,
  reviewUserId,
  openEditModal,
}) => {
  Reviews.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
    createdAt: PropTypes.string,
    content: PropTypes.string,
    currentUserId: PropTypes.string,
    reviewUserId: PropTypes.string,
    openEditModal: PropTypes.func,
  };

  // const [editReview, setEditReview] = useState(false);

  // const handleEdit = () => {
  //   setEditReview(!editReview);
  // };

  return (
    <div className="flex flex-col m-auto p-5 w-[75%] border-2 border-[#404040]">
      <div className="flex items-center gap-5 mb-1">
        <img
          src={avatar}
          className="w-[50px] h-[50px] object-cover rounded-full"
          alt=""
        />
        <div className="text-2xl">{name}</div>
      </div>
      <div className="mb-5">
        <StarRating type="user-rating" userRating={rating} />
        <div className="text-sm">{createdAt}</div>
      </div>
      <div>{content}</div>
      {currentUserId === reviewUserId && (
        <div
          onClick={openEditModal}
          className="ml-auto w-8 italic text-xs text-center cursor-pointer hover:text-teal-400 hover:underline"
        >
          Edit
        </div>
      )}
    </div>
  );
};

export default Reviews;
