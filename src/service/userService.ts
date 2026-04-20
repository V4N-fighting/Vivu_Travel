import axios from "axios";
import { User } from "./authService";

const BASE_URL = "http://localhost:3001/api";

export const getUserFromApi = async (id: string): Promise<User> => {
  const userStr = localStorage.getItem("user");
  const token = userStr ? JSON.parse(userStr).access_token : "";
  const res = await axios.get<User>(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateUserToApi = async (user: User): Promise<User> => {
  const userStr = localStorage.getItem("user");
  const token = userStr ? JSON.parse(userStr).access_token : "";
  const res = await axios.put<User>(`${BASE_URL}/users/${user.id}`, user, {
    headers: { Authorization: `Bearer ${token}` }
  });
  // Cập nhật lại localStorage
  const storedUser = userStr ? JSON.parse(userStr) : {};
  const updatedUser = { ...storedUser, ...res.data };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  return res.data;
};
