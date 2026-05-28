import { useEffect } from "react";

export const useAutoLogoutOnLeave = (onLogout: () => void) => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const remember = JSON.parse(localStorage.getItem("rememberMe") || "false");

      if (!remember) {
        onLogout(); 
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [onLogout]);
};
