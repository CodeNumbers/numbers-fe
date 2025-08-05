import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { useGetMusicalList } from '@/hooks/queries/musical/useGetMusicalList';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

const LABELS = ['ㄱ~ㄷ', 'ㄹ~ㅂ', 'ㅅ~ㅈ', 'ㅊ~ㅌ', 'ㅍ~ㅎ'];

export default function UserSidebar() {
  const [searchParams] = useSearchParams();
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();

  const { data: musicalListResponse } = useGetMusicalList(
    { initialRange: selectedLabel },
    {
      initialData: {
        success: true,
        data: [
          {
            id: '1',
            title: '가',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
          },
          {
            id: '2',
            title: '나',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' },
          },
          {
            id: '3',
            title: '다',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop' },
          },
          {
            id: '4',
            title: '라',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
          },
          {
            id: '5',
            title: '마',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' },
          },
        ],
      },
    }
  );
  const musicalList = musicalListResponse?.data;

  return (
    <Sidebar>
      <SidebarContent className="z-10 py-4 bg-black/10 backdrop-blur-sm">
        {LABELS.map((label) => {
          const isSelected = selectedLabel === label;

          const handleLabelClick = (label: string) => {
            setSelectedLabel(label);
          };

          return (
            <SidebarGroup
              key={label}
              onClick={() => handleLabelClick(label)}
              className={cn(
                'cursor-pointer mx-auto w-[calc(100%-32px)] rounded-md px-2 py-1',
                isSelected && 'bg-black/10 text-white'
              )}
            >
              {/* Label */}
              <SidebarGroupLabel className="flex items-center justify-between text-white">
                <p className="font-bold">{label}</p>
                <ChevronDownIcon className={cn('w-4 h-4', isSelected && 'rotate-180')} />
              </SidebarGroupLabel>

              {/* List */}
              <SidebarGroupContent
                className={cn(
                  'my-1 overflow-hidden transition-all duration-500 ease-in-out',
                  isSelected ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <SidebarMenu>
                  {musicalList?.map((musical) => {
                    const isActive = musical.id === searchParams.get('item');

                    return (
                      <SidebarMenuItem key={musical.id}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={`/?item=${encodeURIComponent(musical.id)}`}
                            className={isActive ? 'font-bold text-primary' : ''}
                          >
                            {musical.title}
                          </Link>
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
    </Sidebar>
  );
}
