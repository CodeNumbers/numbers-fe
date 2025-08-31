import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/Sidebar';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const MENU_LIST = [
  {
    label: '뮤지컬 관리',
    pathname: '/admin/musical',
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { setOpen } = useSidebar();

  const handleMenuClick = (pathname: string) => {
    navigate(pathname);
    setOpen(false);
  };

  return (
    <SidebarContainer>
      <SidebarContent className="z-10 py-4 bg-black/10 text-white backdrop-blur-sm">
        <SidebarGroup className={cn('mx-auto w-[calc(100%-32px)] rounded-md px-2 py-1')}>
          <SidebarGroupContent>
            {/* 메뉴 목록 */}
            <SidebarMenu>
              {MENU_LIST.map((menu) => {
                const isCurrentPath = window.location.pathname === menu.pathname;

                return (
                  <SidebarMenuItem key={menu.label}>
                    <SidebarMenuButton
                      onClick={() => handleMenuClick(menu.pathname)}
                      className={cn(isCurrentPath && 'font-semibold text-primary', 'cursor-pointer')}
                    >
                      {menu.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
