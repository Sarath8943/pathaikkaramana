import { Outlet } from "react-router-dom";
import { Footer } from "../components/user/Footer";
import Header from "../components/user/Header";

export const UserLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
