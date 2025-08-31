import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import UpdateMusical from './UpdateMusical';
import { POSTER_SEARCH_KEYWORD, useGetPosterList } from '@/hooks/queries/poster/useGetPosterList';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import DeleteMusical from './DeleteMusical';

export default function PosterList() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  // TODO: 포스터 목록 조회 -> 뮤지컬 목록 조회로 변경
  const {
    isError,
    isLoading,
    data: posterListResponse,
  } = useGetPosterList({
    mode: POSTER_SEARCH_KEYWORD.VIEWS,
    limit: limit,
    // 페이지 기반으로 offset 계산하는 로직 추가 필요
  });

  const posterList = posterListResponse?.data;
  const totalItems = 0; // posterListResponse?.total, API에서 total 값을 제공한다고 가정
  const totalPages = Math.ceil(totalItems / limit);
  const isPosterListEmpty = posterList?.length === 0;

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="size-4 animate-spin" />
      </div>
    );
  }

  if (isError || isPosterListEmpty) {
    return (
      <div className="bg-blue-900/10 p-6 rounded-lg border border-blue-800/30 mt-4">
        <p className="text-gray-400 text-center">{isError ? '오류가 발생했습니다.' : '등록된 뮤지컬이 없습니다.'}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 뮤지컬 목록 */}
      {posterList?.map((poster) => (
        <div key={poster.musicalId} className="flex items-center gap-4">
          <div className="flex flex-1 items-center gap-4">
            <img src={poster.imageUrl} alt={poster.musicalTitle} className="w-[65px] h-[85px] bg-black/50 object-cover" />
            <p className="text-lg text-gray-400">{poster.musicalTitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* 수정 */}
            <UpdateMusical musicalId={poster.musicalId.toString()} />

            {/* 삭제 */}
            <DeleteMusical musicalId={poster.musicalId.toString()} />
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination className="flex justify-center mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
              const pageNumber =
                currentPage <= 3 ? index + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + index : currentPage - 2 + index;

              return (
                <PaginationItem key={index}>
                  <PaginationLink isActive={pageNumber === currentPage} onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
