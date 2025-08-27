import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function UserLayout() {
  return (
    <div className="flex flex-1 flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-auto">
        <Sidebar />
        <Outlet />
        <Toaster position="top-right" richColors />
      </main>
      <Footer />
    </div>
  );
}
