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
import { useMusicalStore } from '@/store/musical/musicalStore';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const QUERY_PARAMS_MUSICAL_ID = 'musicalId';
export const QUERY_PARAMS_RANGE = 'range';

const ALPHABET_RANGES = ['ㄱ~ㄷ', 'ㄹ~ㅂ', 'ㅅ~ㅈ', 'ㅊ~ㅌ', 'ㅍ~ㅎ'];

export default function UserSidebar() {
  // 선택된 뮤지컬 id
  const [searchParams] = useSearchParams();
  const selectedMusicalId = Number(searchParams.get(QUERY_PARAMS_MUSICAL_ID));

  // 선택된 뮤지컬 범위
  const [selectedRange, setSelectedRange] = useState<string>();

  // 선택된 범위에 해당하는 뮤지컬 목록 조회
  const { musicalList, setMusicalList } = useMusicalStore();
  const { data: musicalListResponse } = useGetMusicalList({ initialRange: selectedRange });

  useEffect(() => {
    if (musicalListResponse?.data) {
      setMusicalList(musicalListResponse.data);
    }
  }, [musicalListResponse?.data, setMusicalList]);

  return (
    <Sidebar>
      <SidebarContent className="z-10 py-4 bg-black/10 backdrop-blur-sm">
        {ALPHABET_RANGES.map((range) => {
          const isRangeSelected = selectedRange === range;

          return (
            <SidebarGroup
              key={range}
              onClick={() => setSelectedRange(range)}
              className={cn(
                'cursor-pointer mx-auto w-[calc(100%-32px)] rounded-md px-2 py-1',
                isRangeSelected && 'bg-black/10 text-white'
              )}
            >
              {/* Label */}
              <SidebarGroupLabel className="flex items-center justify-between text-white">
                <p className="font-bold">{range}</p>
                <ChevronDownIcon className={cn('w-4 h-4', isRangeSelected && 'rotate-180')} />
              </SidebarGroupLabel>

              {/* List */}
              <SidebarGroupContent
                className={cn(
                  'my-1 overflow-hidden ease-in-out',
                  isRangeSelected
                    ? 'max-h-[500px] opacity-100 transition-[max-height,opacity] duration-500'
                    : 'max-h-0 opacity-0 transition-none pointer-events-none'
                )}
              >
                <SidebarMenu>
                  {musicalList?.map(({ id, title }) => {
                    const isActive = id === selectedMusicalId;

                    return (
                      <SidebarMenuItem key={id}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={`/?${QUERY_PARAMS_RANGE}=${encodeURIComponent(range)}&${QUERY_PARAMS_MUSICAL_ID}=${encodeURIComponent(id)}`}
                            className={cn(isActive && 'font-bold text-primary')}
                          >
                            {title}
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
