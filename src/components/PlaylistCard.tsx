import { Play, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlaylistCardProps {
  name: string;
  videoCount: number;
  totalDuration: string;
  thumbnails: string[];
}

export function PlaylistCard({ name, videoCount, totalDuration, thumbnails }: PlaylistCardProps) {
  return (
    <div className="bg-gray-800/30 border border-white/10 rounded-xl overflow-hidden hover:border-purple-400/30 transition-colors">
      <div className="flex gap-3 p-3">
        {/* Thumbnail Grid */}
        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30">
          <div className="grid grid-cols-2 gap-0.5 h-full">
            {thumbnails.slice(0, 4).map((thumbnail, index) => (
              <div key={index} className="relative overflow-hidden">
                <ImageWithFallback
                  src={thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Overlay with Play Icon */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Play className="text-white fill-white" size={18} />
            </div>
          </div>
        </div>

        {/* Playlist Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <h3 className="text-white line-clamp-2">{name}</h3>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Play size={14} />
              <span>{videoCount} videos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock size={14} />
              <span>{totalDuration}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
