// src/services/userService.ts
import axios from "axios";
import { User } from "./authService";
import { API_URL } from "../api";

export const getUserFromApi = async (id: string): Promise<User> => {
  const res = await axios.get<User>(`${API_URL}/${id}`);
  return res.data;
};

export const updateUserToApi = async (user: User): Promise<User> => {
  const res = await axios.put<User>(`${API_URL}/${user.id}`, user);
  return res.data;
};
