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

const persistAuth = (data: any) => {
  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify({ ...data.user, access_token: data.access_token }));
  }

  return { ...data.user, access_token: data.access_token };
};

export const register = async (user: User): Promise<void> => {
  try {
    await axios.post(`${AUTH_URL}/register`, user);
  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error("Email da ton tai");
    }
    throw new Error("Co loi xay ra khi dang ky");
  }
};

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, { email, password });
    return persistAuth(res.data);
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Sai email hoac mat khau");
    }
    throw new Error("Co loi xay ra khi dang nhap");
  }
};

export const loginWithGoogle = async (credential: string): Promise<any> => {
  try {
    const res = await axios.post(`${AUTH_URL}/google`, { credential });
    return persistAuth(res.data);
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Khong the xac thuc tai khoan Google");
    }
    throw new Error("Co loi xay ra khi dang nhap bang Google");
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("rememberMe");
};
