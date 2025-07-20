import { SearchIcon } from "lucide-react";
import { Input } from "../ui/Input";
import { SidebarTrigger } from "@/components/ui/Sidebar";

export default function UserHeader() {
  const handleSearch = () => {
    console.log("search");
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-neutral-300 h-14">
      <div className="flex items-center justify-between px-4 h-full">
        {/* 로고 */}
        <SidebarTrigger className="cursor-pointer">
          <p className="text-xl font-bold font-serif">Numbers</p>
        </SidebarTrigger>

        {/* 검색 바 */}
        <form onSubmit={handleSearch}>
          <Input
            type="search"
            placeholder="Search"
            leftSection={
              <SearchIcon
                className="text-neutral-300 cursor-pointer"
                onClick={handleSearch}
              />
            }
          />
        </form>
      </div>
    </header>
  );
}
