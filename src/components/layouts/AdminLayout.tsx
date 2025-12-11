import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router";
import { logout } from "../../store/slices/authSlice";
import type { AppDispatch } from "../../store/store";
import { useEffect } from "react";

const AdminLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    <div className="flex-col w-full h-full">
      <header className="w-full bg-gray-800 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex gap-2">
          <Link to="/admin" className="hover:underline">
            Home
          </Link>
          <Link to="/admin/articles" className="hover:underline">
            Manager Articles
          </Link>
          <Link to="/admin/questions" className="hover:underline">
            Manager Question
          </Link>
          <Link to="/admin/users" className="hover:underline">
            Users
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </nav>
      </header>

      <main className="flex-1 h-screen py-10 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
