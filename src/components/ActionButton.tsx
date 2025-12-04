import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  count: string;
  isActive: boolean;
}

export function ActionButton({ icon: Icon, count, isActive }: ActionButtonProps) {
  return (
    <button className="flex flex-col items-center gap-1 group">
      <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-all hover:scale-110">
        <Icon 
          className={`${isActive ? 'text-purple-400 fill-purple-400' : 'text-white'} transition-colors`} 
          size={24} 
        />
      </div>
      <span className="text-white text-xs">{count}</span>
    </button>
  );
}
