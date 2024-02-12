import { useSelector } from "react-redux";
import { selectCurrentToken } from "../slices/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }

  return null;
};

export default useAuth;
