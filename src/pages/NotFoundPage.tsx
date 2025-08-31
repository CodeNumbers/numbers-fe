import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <h1 className="text-7xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-2">요청하신 페이지를 찾을 수 없습니다.</p>
      <p className="text-sm text-gray-500 mb-6">주소를 다시 확인하거나 홈으로 돌아가세요.</p>
      <button
        onClick={() => navigate('/')}
        className="cursor-pointer px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
