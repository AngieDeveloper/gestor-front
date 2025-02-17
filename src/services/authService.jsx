import API from "./api";

export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error en la autenticación" };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
