import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import RootLayout from '@/layout/RootLayout';
import UserLayout from '@/layout/UserLayout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
