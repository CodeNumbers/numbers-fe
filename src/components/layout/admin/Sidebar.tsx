import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  const isCurrentPath = (pathname: string) => window.location.pathname === pathname;

  return (
    <SidebarContainer>
      <SidebarContent className="z-10 py-4 bg-black/10 text-white backdrop-blur-sm">
        <SidebarGroup className={cn('mx-auto w-[calc(100%-32px)] rounded-md px-2 py-1')}>
          <SidebarGroupContent>
            {/* 메뉴 목록 */}
            <SidebarMenu>
              {MENU_LIST.map((menu) => (
                <SidebarMenuItem key={menu.label}>
                  <SidebarMenuButton
                    onClick={() => navigate(menu.pathname)}
                    className={cn(isCurrentPath(menu.pathname) && 'font-semibold text-primary', 'cursor-pointer')}
                  >
                    {menu.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
