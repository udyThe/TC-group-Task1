import { Play, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoThumbnailProps {
  thumbnail: string;
  title: string;
  creator: string;
  views: string;
  duration: string;
}

export function VideoThumbnail({ thumbnail, title, creator, views, duration }: VideoThumbnailProps) {
  return (
    <div className="flex-shrink-0 w-40 space-y-2">
      <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl overflow-hidden border border-white/10">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <Play className="text-white fill-white" size={20} />
          </div>
        </div>
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-white text-xs">
          {duration}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-white text-sm line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-xs">{creator}</p>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <Eye size={12} />
          <span>{views} views</span>
        </div>
      </div>
    </div>
  );
}
