import { Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface CreatorCardProps {
  id: number;
  name: string;
  username: string;
  followers: string;
  avatar: string;
  isFollowing: boolean;
}

export function CreatorCard({ name, username, followers, avatar, isFollowing: initialFollowing }: CreatorCardProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  return (
    <div className="bg-gray-800/30 border border-white/10 rounded-xl p-4 hover:border-purple-400/30 transition-colors">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
            <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
              <ImageWithFallback
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white truncate">{name}</h3>
          <p className="text-gray-400 text-sm">{username}</p>
          <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
            <Users size={12} />
            <span>{followers} followers</span>
          </div>
        </div>

        {/* Follow Button */}
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`px-4 py-2 rounded-lg transition-all ${
            isFollowing
              ? 'bg-gray-700 border border-white/10 text-gray-300 hover:bg-gray-600'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
