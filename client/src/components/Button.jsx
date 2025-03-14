import PropTypes from "prop-types";

const Button = ({ text, Icon, onClick }) => {
  Button.propTypes = {
    text: PropTypes.string,
    Icon: PropTypes.object,
    onClick: PropTypes.func,
  };
  return (
    <div
      onClick={onClick}
      className="flex border-0 px-2.5 py-1 justify-center items-center text-center rounded-sm cursor-pointer bg-teal-500 hover:bg-teal-400 text-[#242424] text-lg font-extralight tracking-[2px]"
    >
      {Icon && <Icon />}
      {text}
    </div>
  );
};

export default Button;
