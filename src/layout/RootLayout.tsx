import { SidebarProvider } from "@/components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  );
}
