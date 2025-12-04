import { Home, Search, Plus, FolderOpen, User } from 'lucide-react';

interface BottomNavProps {
  onUploadClick?: () => void;
  onSearchClick?: () => void;
  onLibraryClick?: () => void;
  onProfileClick?: () => void;
}

export function BottomNav({ onUploadClick, onSearchClick, onLibraryClick, onProfileClick }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-xl border-t border-white/10 z-20">
      <div className="h-full flex items-center justify-around px-4">
        <NavButton icon={Home} label="Home" isActive={true} />
        <NavButton icon={Search} label="Search" isActive={false} onClick={onSearchClick} />
        <NavButton icon={Plus} label="Upload" isActive={false} isPrimary={true} onClick={onUploadClick} />
        <NavButton icon={FolderOpen} label="Library" isActive={false} onClick={onLibraryClick} />
        <NavButton icon={User} label="Profile" isActive={false} onClick={onProfileClick} />
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isPrimary?: boolean;
  onClick?: () => void;
}

function NavButton({ icon: Icon, label, isActive, isPrimary, onClick }: NavButtonProps) {
  if (isPrimary) {
    return (
      <button className="flex flex-col items-center gap-1 group" onClick={onClick}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-purple-500/50">
          <Icon className="text-white" size={24} />
        </div>
      </button>
    );
  }

  return (
    <button className="flex flex-col items-center gap-1 group" onClick={onClick}>
      <Icon 
        className={`${isActive ? 'text-purple-400' : 'text-gray-400'} group-hover:text-purple-300 transition-colors`} 
        size={24} 
      />
      <span className={`text-xs ${isActive ? 'text-purple-400' : 'text-gray-400'} group-hover:text-purple-300 transition-colors`}>
        {label}
      </span>
    </button>
  );
}