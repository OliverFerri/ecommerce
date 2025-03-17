import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import ImageInput from "../components/ImageInput";
import { uploadFile } from "../supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/calls/userApiCalls";
import axios from "axios";
// import { token } from "../token";

const UserInfo = () => {
  const currentUser = useSelector((state) => state.users.currentUser);

  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    img: "",
  });

  const [imgFile, setImgFile] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("user info start: ", currentUser);
    const getUpdatedUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/users/find/${currentUser._id}`,
          {
            headers: {
              token: "Bearer " + currentUser.accessToken,
            },
          }
        );
        console.log("user info response: ", res.data);
        const userData = res.data;
        console.log("user info user data: ", userData);
        setUpdatedUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUpdatedUser();
  }, [currentUser]);

  console.log("updated user: ", updatedUser);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imgFile) {
      updateUserProfile(currentUser._id, updatedUser, dispatch);
    } else {
      uploadFile(imgFile, setUpdatedUser, updatedUser, (updatedState) => {
        updateUserProfile(currentUser._id, updatedState, dispatch);
      });
    }
  };

  console.log("current user: ", currentUser);

  return (
    <div className="w-[92%] m-auto p-5 h-[calc(100vh-4.5rem)] bg-[#141414] border-teal-900 border-r-1 border-l-1">
      <div className="flex justify-center">
        <div className=" mr-4">
          <ImageInput
            onChange={handleImgChange}
            img={(updatedUser && updatedUser.img) || ""}
          />
        </div>
        <form>
          <Input
            type="text"
            label="First Name"
            value={(updatedUser && updatedUser.firstName) || ""}
            name="firstName"
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Last Name"
            value={(updatedUser && updatedUser.lastName) || ""}
            name="lastName"
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Email"
            value={(updatedUser && updatedUser.email) || ""}
            name="email"
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Address"
            value={(updatedUser && updatedUser.address) || ""}
            name="address"
            onChange={handleChange}
          />
          <Button text="Submit" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
