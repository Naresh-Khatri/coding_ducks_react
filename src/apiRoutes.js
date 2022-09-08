const DEV = process.env.NODE_ENV === "development";
const domain = DEV
  ? "http://localhost:3333"
  : "https://coding_ducks.panipuri.tech";

export const usersRoute = `${domain}/users/`;
export const checkUsernameRoute = `${domain}/users/checkUsername/`;
