import Header from '@/components/layout/UserHeader';
import Footer from '@/components/layout/UserFooter';
import Sidebar from '@/components/layout/UserSidebar';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header />
      <main className="flex-1">
        <Sidebar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
