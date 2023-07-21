import { useSelector } from "react-redux";
import { Auth, Chat, Home, Profile } from "../pages/index.js";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Auth />} />
      <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" />} />
      <Route path="/chat" element={user ? <Chat /> : <Navigate to="/auth" />} />
    </Routes>
  )
}
