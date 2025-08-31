import PosterList from './components/PosterList';
import RegisterMusical from './components/RegisterMusical';

export default function AdminMusicalPage() {
  return (
    <div className="flex flex-col gap-6 text-white mx-auto max-w-[1200px] h-full w-full px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">뮤지컬 관리</h1>

        {/* 뮤지컬 등록 */}
        <RegisterMusical />
      </div>

      {/* 뮤지컬 목록 */}
      <PosterList />
    </div>
  );
}
