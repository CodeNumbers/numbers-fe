import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useGetPosterList } from '@/hooks/queries/poster/useGetPosterList';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const { selectedMenuLabel, selectedMenuItem, setSelectedMenuLabel, setSelectedMenuItem } = useSidebarStore();

  // 선택된 뮤지컬 목록 조회
  const { data: musicalListResponse } = useGetPosterList({ initialRange: selectedMenuLabel });
  const musicalList = musicalListResponse?.data;

  const handleMenuLabelClick = (menuLabel: string) => {
    setSelectedMenuLabel(menuLabel);
  };

  const handleMenuItemClick = (e: React.MouseEvent<HTMLLIElement>, menuItem: number) => {
    e.stopPropagation();
    navigate('/');
    setSelectedMenuItem(menuItem);
  };

  return (
    <SidebarContainer>
      <SidebarContent className="z-10 py-4 bg-black/10 text-white backdrop-blur-sm">
        {['ㄱ~ㄷ', 'ㄹ~ㅂ', 'ㅅ~ㅈ', 'ㅊ~ㅌ', 'ㅍ~ㅎ', 'A-Z/0~9'].map((menuLabel) => {
          const isSelected = selectedMenuLabel === menuLabel;

          return (
            <SidebarGroup key={menuLabel} className={cn('mx-auto w-[calc(100%-32px)] rounded-md px-2 py-1', isSelected && 'bg-black/10')}>
              {/* 메뉴 라벨 */}
              <SidebarGroupLabel onClick={() => handleMenuLabelClick(menuLabel)} className="flex items-center justify-between text-white">
                <p className="font-semibold">{menuLabel}</p>
                <ChevronDownIcon className={cn('w-4 h-4', isSelected && 'rotate-180')} />
              </SidebarGroupLabel>

              {/* 메뉴 그룹 */}
              <SidebarGroupContent
                className={cn(
                  'my-1 overflow-hidden ease-in-out',
                  isSelected ? 'max-h-full transition-[max-height] duration-300' : 'max-h-0'
                )}
              >
                {/* 메뉴 */}
                <SidebarMenu>
                  {musicalList?.map(({ musicalId, title: musicalTitle }) => {
                    const isActive = musicalId === selectedMenuItem;

                    return (
                      <SidebarMenuItem key={musicalId} onClick={(e) => handleMenuItemClick(e, musicalId)}>
                        <SidebarMenuButton className={cn(isActive && 'font-semibold text-primary', 'cursor-pointer')}>
                          {musicalTitle} {musicalId}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </SidebarContainer>
  );
}
