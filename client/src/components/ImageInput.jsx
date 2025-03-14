import PropTypes from "prop-types";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const ImageInput = ({ img, onChange }) => {
  ImageInput.propTypes = {
    img: PropTypes.string,
    onChange: PropTypes.func,
  };
  return (
    <div className="relative">
      <img
        className="h-[310px] w-[310px] object-cover rounded-md"
        src={img}
        alt="client/public/blank-profile.webp"
      />

      <label
        htmlFor="file"
        className="absolute bottom-[10px] right-[10px] text-5xl text-amber-300 opacity-40 hover:opacity-50 cursor-pointer"
      >
        <input type="file" id="file" className="hidden" onChange={onChange} />
        <AddPhotoAlternateIcon fontSize="inherit" />
      </label>
    </div>
  );
};

export default ImageInput;
