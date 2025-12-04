import { TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TopVideoItemProps {
  thumbnail: string;
  title: string;
  views: string;
  trend: 'up' | 'down';
  trendValue: string;
}

export function TopVideoItem({ thumbnail, title, views, trend, trendValue }: TopVideoItemProps) {
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
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <h4 className="text-white text-sm line-clamp-2">{title}</h4>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Eye size={12} />
              <span>{views}</span>
            </div>
            <div className={`flex items-center gap-1 text-xs ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{trendValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
