import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Header } from "./Header";

export const AdminLayout = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background-50">
        <SideBar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header/>
          <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};