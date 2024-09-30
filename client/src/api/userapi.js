import axios from "axios";
axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:3000/api";

// Registration API
export const registerUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:3000/api/signup",
    userData
  );
  return response.data;
};

// Login API
const LOGIN_URL = `${BASE_URL}/login`;
export const AuthenticatedUser = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/refresh`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during token refresh:", error.message);
    throw error;
  }
};

export const verifyUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verifyuser`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during user verification:", error.message);
    throw error;
  }
};
export const LogoutReq = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, null, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Unable to logout, please try again");
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};
