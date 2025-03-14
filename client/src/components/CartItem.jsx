import PropTypes from "prop-types";
import Button from "./Button";
import Input from "./Input";

const CartItem = ({
  name,
  price,
  quantity,
  onChange,
  handleRemove,
  confirmUpdate,
}) => {
  CartItem.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    onChange: PropTypes.func,
    handleRemove: PropTypes.func,
    confirmUpdate: PropTypes.func,
  };

  return (
    <>
      <div className="flex mt-5 ">
        <div className="">
          <img
            className="w-[150px]"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt=""
          />
        </div>
        <div className="flex ">
          <div className=" px-5 py-2 ">
            <div className="text-2xl font-extralight">{name}</div>
            <div className="text-xl font-semibold">${price}</div>
          </div>
          <div className="flex  gap-5 items-center justify-center ">
            <Input
              type="number"
              value={quantity.toString()}
              onChange={onChange}
            />
            <Button text="Update" onClick={confirmUpdate} />
            <Button text="Remove" onClick={handleRemove} />
          </div>
        </div>
      </div>
      <hr className="border-1 border-[#404040] mt-5" />
    </>
  );
};

export default CartItem;
