import axios from "axios";
import { User } from "./authService";
import { API_URL } from "../api";

export const getDataUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
        return JSON.parse(storedUser) as User;
    } catch {
        return null;
    }
}

export const updateUser = async (user: User ): Promise<void> => {
  if (!user.id) {
    throw new Error("Người dùng không có ID để cập nhật.");
  }

  await axios.put(`${API_URL}/${user.id}`, user);
  localStorage.setItem("user", JSON.stringify(user)); // Lưu vào localStorage
  window.dispatchEvent(new Event('userUpdated'));

  alert("Lưu thay đổi thành công");
  
};
