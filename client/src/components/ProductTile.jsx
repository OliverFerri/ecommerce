import PropTypes from "prop-types";
import StarRating from "./start-rating/StarRating";

const ProductTile = ({ title, price, score, img }) => {
  ProductTile.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    score: PropTypes.number,
    img: PropTypes.string,
  };

  return (
    <div className="w-100 h-50 cursor-pointer mx-5 bg-[#191919] hover:bg-[#202020] rounded-sm shadow-md shadow-teal-800 hover:shadow-teal-600 px-2.5 flex  justify-around items-center">
      <div className=" w-[170px] mr-5">
        <img src={img} alt="" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-3xl">{title}</div>

        <div>
          <StarRating maxRating={5} rating={score} />
        </div>
        <div>{price}</div>
      </div>
    </div>
  );
};

export default ProductTile;
