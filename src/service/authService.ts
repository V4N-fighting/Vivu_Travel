import axios from "axios";
import { AUTH_URL } from "../api";

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  role?: string;
  access_token?: string;
  phone?: string;
  address?: string;
  avatarFile?: File;
}

export const register = async (user: User): Promise<void> => {
  try {
    await axios.post(`${AUTH_URL}/register`, user);
  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error("Email đã tồn tại");
    }
    throw new Error("Có lỗi xảy ra khi đăng ký");
  }
};

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, { email, password });
    
    // Lưu Token vào localStorage
    if (res.data.access_token) {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify({ ...res.data.user, access_token: res.data.access_token }));
    }
    
    return { ...res.data.user, access_token: res.data.access_token };
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Sai email hoặc mật khẩu");
    }
    throw new Error("Có lỗi xảy ra khi đăng nhập");
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("rememberMe");
};
