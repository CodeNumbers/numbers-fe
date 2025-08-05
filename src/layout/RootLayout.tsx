import { SidebarProvider } from '@/components/ui/Sidebar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
