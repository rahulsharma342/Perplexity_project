import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hook/useAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const App = () => {
  const { fetchCurrentUser } = useAuth();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
