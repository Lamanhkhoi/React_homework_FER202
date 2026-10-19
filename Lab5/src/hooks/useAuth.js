import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Custom hook (Lab 3): thay cho việc viết useContext(AuthContext) ở mọi component
export function useAuth() {
  return useContext(AuthContext);
}
