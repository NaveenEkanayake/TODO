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
    const response = await fetch("API_URL_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`, // Assuming you're using a refresh token stored in localStorage
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to refresh token");
    }

    return data; // Ensure this includes the new token
  } catch (error) {
    console.error("Error during token refresh:", error);
    throw error; // Rethrow the error for further handling
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
