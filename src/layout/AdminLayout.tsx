import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/admin/Sidebar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function AdminLayout() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header />
      <main className="flex-1">
        <Sidebar />
        <Outlet />
        <Toaster position="top-right" richColors />
      </main>
      <Footer />
    </div>
  );
}
