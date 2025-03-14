import PropTypes from "prop-types";

const Input = ({ label, placeholder, type, name, value, onChange }) => {
  Input.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  return (
    <div className={type === "number" ? "w-[150px] p-2" : "w-[500px] p-2"}>
      <label
        htmlFor={name}
        className="flex pr-0.5 text-xl items-center justify-between"
      >
        {label}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={
            type === "number"
              ? "bg-[#303030] p-3 w-[100px] text-center"
              : "bg-[#303030] p-3 sm:w-[75%] md:w-[325px]"
          }
        />
      </label>
    </div>
  );
};

export default Input;
