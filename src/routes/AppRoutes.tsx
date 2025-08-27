import AdminLayout from '@/layout/AdminLayout';
import RootLayout from '@/layout/RootLayout';
import UserLayout from '@/layout/UserLayout';
import AdminPage from '@/pages/admin';
import AdminMusicalPage from '@/pages/admin/musical';
import MusicalPage from '@/pages/musical';
import MusicalDetailPage from '@/pages/musical/[id]';
import NotFoundPage from '@/pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<UserLayout />}>
          {/* 404 페이지 */}
          <Route path="*" element={<NotFoundPage />} />

          {/* 뮤지컬 관련 페이지 */}
          <Route path="/" element={<MusicalPage />} />
          <Route path="/musical/:musicalId" element={<MusicalDetailPage />} />
        </Route>

        {/* 관리자 페이지 */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/musical" element={<AdminMusicalPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
