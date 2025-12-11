import { useEffect, useState } from "react";
import { authServices } from "../services/authServer";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await authServices.checkLogin();
      setUser(currentUser);
      setLoading(false);
    };
    checkUser();
  }, []);

  return { user, loading };
};
