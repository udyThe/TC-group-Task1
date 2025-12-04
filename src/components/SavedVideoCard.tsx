import { Bookmark, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SavedVideoCardProps {
  thumbnail: string;
  title: string;
  creator: string;
  duration: string;
  progress: number;
}

export function SavedVideoCard({ thumbnail, title, creator, duration, progress }: SavedVideoCardProps) {
  return (
    <div className="space-y-2">
      <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl overflow-hidden border border-white/10 group">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Bookmark Indicator */}
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-purple-500/90 backdrop-blur-sm flex items-center justify-center">
          <Bookmark className="text-white fill-white" size={16} />
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded flex items-center gap-1">
          <Clock className="text-white" size={12} />
          <span className="text-white text-xs">{duration}</span>
        </div>

        {/* Progress Bar (if in progress) */}
        {progress > 0 && progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Completed Badge */}
        {progress === 100 && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded text-white text-xs">
            ✓ Completed
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="space-y-1">
        <h3 className="text-white text-sm line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-xs">{creator}</p>
      </div>
    </div>
  );
}
