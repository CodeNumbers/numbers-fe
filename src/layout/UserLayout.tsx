import Header from "@/components/header/UserHeader";
import Sidebar from "@/components/sidebar/UserSidebar";
import Footer from "@/components/footer/UserFooter";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Sidebar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
