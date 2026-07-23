import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const UserLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-ivory">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
