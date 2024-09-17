import { Navigate, Outlet, useLocation, useNavigate } from "react-router";

export default function RequireAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    navigate("/");
  }
  if (
    localStorage.getItem("id") &&
    sessionStorage.getItem("id") !== localStorage.getItem("id")
  ) {
    navigate("/");
  }
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/auth/login" />
  );
}
