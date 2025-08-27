import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from './Input';

interface Props {
  previewUrl?: string | null;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImagePreview({ previewUrl, onFileChange }: Props) {
  const [preview, setPreview] = useState<string | null>(previewUrl ?? null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));

    if (onFileChange) {
      onFileChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 이미지 미리보기 */}
      {preview && (
        <div className="w-42 h-50 overflow-hidden rounded-md border border-gray-600">
          <img src={preview} alt="포스터 미리보기" className="w-full h-full object-cover" />
        </div>
      )}
      {/* 이미지 업로드 */}
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        classNames={{
          container: 'px-1.5 h-10 bg-transparent border-gray-600 border-dashed hover:bg-gray-900/10',
          input: cn(
            'cursor-pointer text-white',
            'file:text-white file:bg-gray-800 file:border-0 file:rounded file:px-2 file:mr-2 file:cursor-pointer file:hover:bg-gray-700'
          ),
        }}
      />
    </div>
  );
}
