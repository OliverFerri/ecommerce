import { useSelector } from "react-redux";

const Token2 = () => {
  const currentUser = useSelector((state) => state.users.currentUser);

  return currentUser.accessToken;
};

export default Token2;
