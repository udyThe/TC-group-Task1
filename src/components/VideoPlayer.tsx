import { Heart, Bookmark, Share2, MessageCircle, ChevronUp, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ActionButton } from './ActionButton';
import { TopicTag } from './TopicTag';
import { BottomNav } from './BottomNav';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { generatePersonalizedFeed } from '../utils/feedAlgorithm';
import { Video } from '../types';

interface VideoPlayerProps {
  readonly onNavigateToUpload: () => void;
  readonly onNavigateToSearch: () => void;
  readonly onNavigateToLibrary: () => void;
  readonly onNavigateToProfile: () => void;
}

export function VideoPlayer({ onNavigateToUpload, onNavigateToSearch, onNavigateToLibrary, onNavigateToProfile }: VideoPlayerProps) {
  const {
    videos,
    likeVideo,
    unlikeVideo,
    likedVideos,
    followCreator,
    unfollowCreator,
    followedCreators,
    addToPlaylist,
    playlists,
    userInterests,
    progress,
    markVideoWatched,
  } = useApp();

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [personalizedVideos, setPersonalizedVideos] = useState<Video[]>([]);
  const [showComments, setShowComments] = useState(false);

  // Generate personalized feed
  useEffect(() => {
    const watchedVideoIds = progress.watchedVideos.map(w => w.videoId);
    const feed = generatePersonalizedFeed({
      videos,
      userInterests,
      followedCreators,
      watchedVideos: watchedVideoIds,
      likedVideos,
    });
    setPersonalizedVideos(feed);
  }, [videos, userInterests, followedCreators, likedVideos, progress]);

  const currentVideo = personalizedVideos[currentVideoIndex];

  if (!currentVideo) {
    return <div className="h-full w-full bg-black flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>;
  }

  const isLiked = likedVideos.includes(currentVideo.id);
  const isFollowing = followedCreators.includes(currentVideo.creatorId);
  const isSaved = playlists.some(p => p.videoIds.includes(currentVideo.id));

  const handleLike = () => {
    if (isLiked) {
      unlikeVideo(currentVideo.id);
    } else {
      likeVideo(currentVideo.id);
    }
  };

  const handleFollow = () => {
    if (isFollowing) {
      unfollowCreator(currentVideo.creatorId);
    } else {
      followCreator(currentVideo.creatorId);
    }
  };

  const handleSave = () => {
    if (playlists.length > 0) {
      // Add to first playlist (Watch Later)
      addToPlaylist(playlists[0].id, currentVideo.id);
    }
  };

  const handleNextVideo = () => {
    // Mark current video as watched
    markVideoWatched(currentVideo.id, currentVideo.duration);
    
    if (currentVideoIndex < personalizedVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={currentVideo.thumbnail}
          alt={currentVideo.title}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        
        {/* Play indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center animate-pulse">
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
          </div>
        </div>
        
        {/* Simulated video progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-purple-500 transition-all duration-1000"
            style={{ width: '45%' }}
          />
        </div>
      </div>

      {/* Swipe areas for navigation */}
      <button 
        className="absolute top-0 left-0 right-0 h-1/2 z-5 cursor-pointer bg-transparent border-none"
        onClick={handlePreviousVideo}
        aria-label="Previous video"
      />
      <button 
        className="absolute bottom-24 left-0 right-0 h-1/2 z-5 cursor-pointer bg-transparent border-none"
        onClick={handleNextVideo}
        aria-label="Next video"
      />

      {/* Top Section */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between z-10">
        {/* MVP Notice */}
        <div className="absolute top-14 left-4 right-4 bg-purple-500/90 backdrop-blur-sm rounded-lg p-3 text-white text-xs z-50 animate-pulse">
          <p className="font-semibold">📹 MVP Demo Mode</p>
          <p className="mt-1 opacity-90">Using images as video placeholders. Real video playback requires backend integration.</p>
        </div>
        
        {/* Creator Profile */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
              <img 
                src={currentVideo.creator.avatar} 
                alt={currentVideo.creator.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {currentVideo.creator.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={10} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <p className="text-white font-medium">{currentVideo.creator.name}</p>
            <p className="text-gray-400 text-xs">{currentVideo.creator.username}</p>
          </div>
          <button
            onClick={handleFollow}
            className={`ml-2 px-4 py-1 rounded-full text-sm font-medium transition-colors ${
              isFollowing
                ? 'bg-gray-700 text-white'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-purple-500/30">
          <p className="text-white text-sm">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {currentVideoIndex + 1}
            </span>
            <span className="text-gray-400">/{personalizedVideos.length}</span>
          </p>
        </div>
      </div>

      {/* Right Side Action Buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-10">
        <button onClick={handleLike} className="bg-transparent border-none p-0" aria-label="Like video">
          <ActionButton 
            icon={Heart} 
            count={currentVideo.likes >= 1000 ? `${(currentVideo.likes / 1000).toFixed(1)}K` : currentVideo.likes.toString()} 
            isActive={isLiked} 
          />
        </button>
        <button onClick={() => setShowComments(!showComments)} className="bg-transparent border-none p-0" aria-label="View comments">
          <ActionButton 
            icon={MessageCircle} 
            count={currentVideo.comments.toString()} 
            isActive={showComments} 
          />
        </button>
        <button onClick={handleSave} className="bg-transparent border-none p-0" aria-label="Save video">
          <ActionButton 
            icon={Bookmark} 
            count="Save" 
            isActive={isSaved} 
          />
        </button>
        <ActionButton icon={Share2} count="Share" isActive={false} />
      </div>

      {/* Bottom Content Overlay */}
      <div className="absolute bottom-24 left-0 right-0 px-4 z-10">
        <div className="space-y-3">
          <h2 className="text-white text-xl font-bold">
            {currentVideo.title}
          </h2>
          <p className="text-gray-300 text-sm line-clamp-2">
            {currentVideo.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {currentVideo.topics.slice(0, 3).map((topic) => (
              <TopicTag key={topic} label={topic} />
            ))}
            <TopicTag label={currentVideo.skillLevel} />
            <TopicTag label={`${currentVideo.duration}s`} />
          </div>
        </div>
      </div>

      {/* Swipe Up Indicator */}
      {currentVideoIndex < personalizedVideos.length - 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
          <ChevronUp className="text-white/60" size={24} />
          <p className="text-white/60 text-xs mt-1">Swipe up</p>
        </div>
      )}

      {/* Comments Drawer */}
      {showComments && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg rounded-t-3xl z-20 max-h-[60vh] overflow-y-auto p-4">
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4" />
          <h3 className="text-white text-lg font-bold mb-4">{currentVideo.comments} Comments</h3>
          <div className="space-y-4">
            <div className="text-gray-400 text-center py-8">
              Comments coming soon...
            </div>
          </div>
        </div>
      )}

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