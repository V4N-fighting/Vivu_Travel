// src/services/authService.ts
import axios from "axios";
import { API_URL } from "../api";


export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  avatar?: string;
}

export const register = async (user: User): Promise<void> => {
  const check = await axios.get(`${API_URL}?email=${user.email}`);
  if (check.data.length > 0) {
    throw new Error("Email đã tồn tại");
  }

  const newUser = {
    ...user,
    id: Date.now(),
  };

  await axios.post(API_URL, newUser);
};


export const login = async (email: string, password: string): Promise<User> => {
  const res = await axios.get(`${API_URL}?email=${email}&password=${password}`);
  if (res.data.length === 0) {
    throw new Error("Sai email hoặc mật khẩu");
  }

  return res.data[0];
};

export const logout = () => {
  localStorage.removeItem("user");
};

