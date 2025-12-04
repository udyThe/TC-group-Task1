import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecentActivityItemProps {
  thumbnail: string;
  title: string;
  creator: string;
  timeAgo: string;
}

export function RecentActivityItem({ thumbnail, title, creator, timeAgo }: RecentActivityItemProps) {
  return (
    <div className="bg-gray-800/30 border border-white/10 rounded-xl overflow-hidden hover:border-purple-400/30 transition-colors">
      <div className="flex gap-3 p-3">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex-shrink-0">
          <ImageWithFallback
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="text-white fill-white" size={16} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h4 className="text-white text-sm line-clamp-2">{title}</h4>
            <p className="text-gray-400 text-xs mt-1">{creator}</p>
          </div>
          <p className="text-gray-500 text-xs">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
}
