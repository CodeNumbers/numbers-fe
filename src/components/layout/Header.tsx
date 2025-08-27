import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { SidebarTrigger } from '@/components/ui/Sidebar';
import { cn } from '@/lib/utils';

export default function Header() {
  const handleSearch = () => {
    console.log('search');
  };

  return (
    <header
      className={cn(
        'sticky top-0 left-0 right-0 z-50 h-16 px-4',
        'flex items-center justify-between border-b border-black/10 bg-black/10 backdrop-blur-none text-neutral-300'
      )}
    >
      <SidebarTrigger className="cursor-pointer hover:bg-black/20 rounded-md">
        <p className="text-xl font-bold font-serif text-white">Numbers</p>
      </SidebarTrigger>

      <Input
        type="search"
        placeholder="Search"
        onClick={handleSearch}
        leftSection={<SearchIcon onClick={handleSearch} className="cursor-pointer" />}
        classNames={{ container: 'w-64' }}
      />
    </header>
  );
}
