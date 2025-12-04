import { PlayCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseProgressCardProps {
  title: string;
  thumbnail: string;
  progress: number;
  videosCompleted: number;
  totalVideos: number;
}

export function CourseProgressCard({ title, thumbnail, progress, videosCompleted, totalVideos }: CourseProgressCardProps) {
  return (
    <div className="bg-gray-800/30 border border-white/10 rounded-xl overflow-hidden hover:border-purple-400/30 transition-colors">
      <div className="flex gap-3 p-3">
        {/* Thumbnail */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex-shrink-0">
          <ImageWithFallback
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircle className="text-white" size={24} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="text-white text-sm line-clamp-2">{title}</h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">{videosCompleted}/{totalVideos} videos</span>
              <span className="text-purple-400">{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
