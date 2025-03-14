// export const token2 = JSON.parse(
//   JSON.parse(localStorage.getItem("persist:root")).users
// )?.currentUser?.accessToken;

export const token = (() => {
  try {
    const persistRoot = localStorage.getItem("persist:root");
    if (!persistRoot) return null;

    const usersData = JSON.parse(JSON.parse(persistRoot).users);
    return usersData?.currentUser?.accessToken || null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
})();

export const getToken = () => {
  try {
    const persistRoot = localStorage.getItem("persist:root");
    if (!persistRoot) return null;

    const usersData = JSON.parse(JSON.parse(persistRoot).users);
    return usersData?.currentUser?.accessToken || null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};
