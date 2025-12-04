import { Heart, Bookmark, Share2, MessageCircle, Home, Search, Plus, FolderOpen, User, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ActionButton } from './ActionButton';
import { TopicTag } from './TopicTag';
import { BottomNav } from './BottomNav';

interface VideoPlayerProps {
  onNavigateToUpload: () => void;
  onNavigateToSearch: () => void;
  onNavigateToLibrary: () => void;
  onNavigateToProfile: () => void;
}

export function VideoPlayer({ onNavigateToUpload, onNavigateToSearch, onNavigateToLibrary, onNavigateToProfile }: VideoPlayerProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759984782106-4b56d0aa05b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzY0NzM1MDczfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Educational video"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
      </div>

      {/* Top Section */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between z-10">
        {/* Creator Profile */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-white">DK</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-white">Dr. Sarah Kim</p>
            <p className="text-gray-400 text-xs">@learnwithsarah</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-purple-500/30">
          <p className="text-white text-sm">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">2</span>
            <span className="text-gray-400">/10</span>
          </p>
        </div>
      </div>

      {/* Right Side Action Buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-10">
        <ActionButton icon={Heart} count="24.5K" isActive={false} />
        <ActionButton icon={Bookmark} count="1.2K" isActive={false} />
        <ActionButton icon={MessageCircle} count="892" isActive={false} />
        <ActionButton icon={Share2} count="Share" isActive={false} />
      </div>

      {/* Bottom Content Overlay */}
      <div className="absolute bottom-24 left-0 right-0 px-4 z-10">
        <div className="space-y-3">
          <h2 className="text-white text-xl">
            Understanding Python List Comprehensions
          </h2>
          <div className="flex flex-wrap gap-2">
            <TopicTag label="Python" />
            <TopicTag label="Beginner" />
            <TopicTag label="3 min" />
          </div>
        </div>
      </div>

      {/* Swipe Up Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
        <ChevronUp className="text-white/60" size={24} />
        <p className="text-white/60 text-xs mt-1">Swipe up</p>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        onUploadClick={onNavigateToUpload} 
        onSearchClick={onNavigateToSearch}
        onLibraryClick={onNavigateToLibrary}
        onProfileClick={onNavigateToProfile}
      />
    </div>
  );
}