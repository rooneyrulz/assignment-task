import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { accessToken } = useSelector((state) => state.auth);

  return accessToken ? <Navigate to='/dashboard' replace />  : <Outlet />;
};

export default PublicRoute;
