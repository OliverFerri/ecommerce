import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Button from "./Button";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/slices/userSlice";
import { NavLink } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import axios from "axios";
// import { token } from "../token";

const Navbar = () => {
  // const userCart = useSelector((state) => state.cart.carts);
  const cartLength = useSelector((state) => state.cart.carts?.products?.length);
  const currentUser = useSelector((state) => state.users.currentUser);

  // console.log("Navbar re-render: ", currentUser);

  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [navbarUser, setNavbarUser] = useState(null);

  // {
  //   firstName: currentUser?.firstName || "",
  //   lastName: currentUser?.lastName || "",
  //   email: currentUser?.email || "",
  //   address: currentUser?.address || "",
  //   img: currentUser?.img || "",
  // }

  // useEffect(() => {
  //   if (currentUser && !navbarUser) {
  //     setNavbarUser(currentUser); // Temporarily set it to avoid double API calls
  //   }
  // }, [currentUser, navbarUser]);

  // useEffect(() => {
  //   console.log("useEffect start: ", currentUser);
  //   if (!currentUser || !currentUser._id || !token) return;

  //   const getNavbarUser = async () => {
  //     try {
  //       const res = await axios.get(`/api/users/find/${currentUser._id}`, {
  //         headers: {
  //           token: "Bearer " + token,
  //         },
  //       });

  //       console.log("response: ", res.data);

  //       const userData = { ...res.data, cartLength: cartLength };
  //       setNavbarUser(userData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getNavbarUser();
  // }, [currentUser, cartLength]);

  useEffect(() => {
    console.log("useEffect start: ", currentUser);
    const getNavbarUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/users/find/${currentUser._id}`,
          {
            headers: {
              token: "Bearer " + currentUser.accessToken,
            },
          }
        );
        console.log("response: ", res.data);
        const userData = {
          ...res.data,
          cartLength: cartLength ? cartLength : 0,
        };
        console.log("userData: ", userData);
        setNavbarUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getNavbarUser();
  }, [currentUser, cartLength]);

  // useEffect(() => {
  //   if (currentUser) console.log("currentUser:", currentUser);
  //   if (navbarUser) console.log("navbarUser: ", navbarUser);
  // }, [navbarUser, currentUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/products`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(clearCart());
    setMenuOpen(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (searchTerm) => setValue(searchTerm);

  const handleSearch = (searchTerm) => {
    //our api to fetch
    console.log("search:", searchTerm);
  };

  return (
    <div className="sticky top-0 h-18 px-5 border-b-1 border-gray-500 text-teal-500 bg-gray-600 flex justify-between items-center">
      <NavLink to={"/"}>
        <div className=" text-4xl font-family: var(Patrick Hand, serif);">
          Shop Store
        </div>
      </NavLink>
      <div className="relative">
        <div className="flex border-2 w-150 h-10 rounded-3xl items-center pl-4">
          <div onClick={() => handleSearch(value)} className=" mr-1 text-xl">
            <SearchIcon />
          </div>
          <input
            onChange={onChange}
            value={value}
            className="outline-0 text-xl w-full pr-8"
          ></input>
        </div>
        {value && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-[#404040] w-[500px] p-2 border-2 border-[#454545] rounded-sm">
            {data
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const productName = item.title.toLowerCase();

                return (
                  searchTerm &&
                  productName.includes(searchTerm) &&
                  productName !== searchTerm
                );
              })
              .slice(0, 10)
              .map((item) => (
                <NavLink key={item._id} to={`/products/${item._id}`}>
                  <div
                    onClick={() => onSearch(item.title)}
                    className="cursor-pointer hover:bg-[#303030]"
                  >
                    {item.title}
                  </div>
                </NavLink>
              ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-5">
        <NavLink to={currentUser ? `/cart/${currentUser?._id}` : "/login"}>
          <div>
            <Badge badgeContent={cartLength ?? 0} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </div>
        </NavLink>
        {!currentUser ? (
          <NavLink to={"/login"}>
            <Button text="Sign In" />
          </NavLink>
        ) : (
          <img
            onClick={handleClick}
            className="w-15 h-15 rounded-full object-cover cursor-pointer"
            src={navbarUser?.img}
          />
        )}
      </div>
      {menuOpen && (
        <div className=" border-1 w-40 border-gray-600 rounded-lg bg-gray-600 fixed right-[10px] top-[72px]">
          <div className="flex py-2 px-4 text-xl font-bold italic items-center">
            <img
              className="w-[30px] h-[30px] object-cover rounded-full mr-2"
              src={navbarUser?.img}
              alt=""
            />
            {currentUser?.username}
          </div>
          <ul>
            <NavLink to={`/users/${currentUser?._id}`}>
              <li className="px-4 py-1 text-xl cursor-pointer hover:bg-gray-700 w-[100%]">
                Profile <PermIdentityIcon />
              </li>
            </NavLink>
            <li
              onClick={handleLogout}
              className="px-4 py-1 text-xl cursor-pointer hover:bg-gray-700 w-[100%]"
            >
              Sign Out <LogoutIcon />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
