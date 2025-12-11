import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import { Button } from "react-bootstrap";

const UserLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  // Nếu token không tồn tại, redirect về login
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/", { replace: true });
  };
  return (
    <div className="flex=col w-full h-full ">
      {/* Sidebar */}
      <header className="w-full bg-gray-800 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex  gap-2">
          <Link to="/dashboard" className="hover:underline">
            Home
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </nav>
      </header>

      <main className="flex-1  bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
