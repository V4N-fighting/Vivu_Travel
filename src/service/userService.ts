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
  
  const formData = new FormData();
  formData.append('firstName', user.firstName || '');
  formData.append('lastName', user.lastName || '');
  formData.append('email', user.email || '');
  if (user.phone) formData.append('phone', user.phone);
  if (user.address) formData.append('address', user.address);
  
  // Nếu avatar là file (từ input file), gửi dưới dạng file
  if (user.avatarFile) {
    formData.append('avatar', user.avatarFile);
  } else if (user.avatar) {
    // Nếu là string (url cũ hoặc base64), gửi string
    formData.append('avatar', user.avatar);
  }

  const res = await axios.put<User>(`${BASE_URL}/users/${user.id}`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  
  // Cập nhật lại localStorage
  const storedUser = userStr ? JSON.parse(userStr) : {};
  const updatedUser = { ...storedUser, ...res.data };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  return res.data;
};
