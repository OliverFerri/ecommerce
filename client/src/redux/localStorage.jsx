export const token = JSON.parse(
  JSON.parse(localStorage.getItem("persist:root")).users
)?.currentUser?.accessToken;

// export const localUserData = JSON.parse(
//   JSON.parse(localStorage.getItem("persist:root"))?.users
// )?.currentUser;

// const persistedRoot = localStorage.getItem("persist:root");
// export const localUserData = persistedRoot
//   ? JSON.parse(JSON.parse(persistedRoot)?.users)?.currentUser
//   : null;
