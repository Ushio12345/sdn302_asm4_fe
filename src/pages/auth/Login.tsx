// Login.tsx
import { useState } from "react";
import CardLogin from "../../components/ui/CardLogin";
import { authServices } from "../../services/authServer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { setCredentials } from "../../store/slices/authSlice";
import type { AppDispatch } from "../../store/store";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      if (isLogin) {
        // Login

        const loginResp: any = await authServices.login(formData);

        // Lưu vào localStorage
        localStorage.setItem("token", loginResp.token);
        localStorage.setItem("user", JSON.stringify(loginResp.data));

        dispatch(
          setCredentials({ user: loginResp.data, token: loginResp.token })
        );

        console.log(loginResp);

        // Redirect theo role
        if (loginResp.data.isAdmin) navigate("/admin");
        else navigate("/dashboard");
      } else {
        // Register
        const registerResp = await authServices.register(formData);

        toast.success("Register successful! You can login now.");

        // Chuyển sang login
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <CardLogin
        isLogin={isLogin}
        onToogle={setIsLogin}
        onFormSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
