import { GripVertical, ChevronUp, ChevronDown, X, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    duration: number;
    thumbnail: string;
  };
  index: number;
  onDelete: (id: number) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function VideoCard({ video, index, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: VideoCardProps) {
  return (
    <div className="bg-gray-800/50 border border-white/10 rounded-xl p-3 hover:border-purple-400/30 transition-colors group">
      <div className="flex gap-3">
        {/* Drag Handle */}
        <div className="flex flex-col items-center justify-center gap-1 pt-1">
          <GripVertical className="text-gray-500 cursor-grab active:cursor-grabbing" size={20} />
          <span className="text-gray-500 text-xs">#{index + 1}</span>
        </div>

        {/* Thumbnail */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex-shrink-0">
          <ImageWithFallback
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-1" />
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm truncate">{video.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="text-gray-400" size={14} />
            <span className="text-gray-400 text-xs">{video.duration}s</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-1">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className={`w-7 h-7 rounded border flex items-center justify-center transition-colors ${
              isFirst
                ? 'border-white/5 text-gray-600 cursor-not-allowed'
                : 'border-white/10 text-gray-400 hover:bg-purple-500/20 hover:border-purple-400/30 hover:text-purple-300'
            }`}
          >
            <ChevronUp size={16} />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className={`w-7 h-7 rounded border flex items-center justify-center transition-colors ${
              isLast
                ? 'border-white/5 text-gray-600 cursor-not-allowed'
                : 'border-white/10 text-gray-400 hover:bg-purple-500/20 hover:border-purple-400/30 hover:text-purple-300'
            }`}
          >
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(video.id)}
          className="w-7 h-7 rounded border border-white/10 text-gray-400 hover:bg-red-500/20 hover:border-red-400/30 hover:text-red-300 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
