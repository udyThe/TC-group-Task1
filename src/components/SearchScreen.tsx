import { Search, TrendingUp, Eye } from 'lucide-react';
import { TrendingTopicPill } from './TrendingTopicPill';
import { CreatorCard } from './CreatorCard';
import { CourseProgressCard } from './CourseProgressCard';
import { BottomNav } from './BottomNav';
import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { searchVideos, getTrendingVideos } from '../utils/feedAlgorithm';
import { topics } from '../data/mockData';

interface SearchScreenProps {
  readonly onNavigateBack: () => void;
  readonly onNavigateToUpload?: () => void;
  readonly onNavigateToLibrary?: () => void;
  readonly onNavigateToProfile?: () => void;
}

export function SearchScreen({ onNavigateBack, onNavigateToUpload, onNavigateToLibrary, onNavigateToProfile }: SearchScreenProps) {
  const { videos, microCourses, progress, followCreator, unfollowCreator, followedCreators } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Trending topics with colors
  const trendingTopics = useMemo(() => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-rose-500',
      'from-green-500 to-emerald-500',
      'from-yellow-500 to-orange-500',
    ];
    const icons = ['🐍', '🤖', '📊', '🎨', '📈', '💰'];
    return topics.slice(0, 6).map((topic, index) => ({
      label: topic,
      color: colors[index % colors.length],
      icon: icons[index % icons.length],
    }));
  }, []);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return getTrendingVideos(videos, 10);
    }
    return searchVideos(videos, searchQuery);
  }, [videos, searchQuery]);

  // Get unique creators from videos
  const topCreators = useMemo(() => {
    const creatorMap = new Map();
    for (const video of videos) {
      if (!creatorMap.has(video.creatorId)) {
        creatorMap.set(video.creatorId, {
          id: video.creatorId,
          name: video.creator.name,
          username: video.creator.username,
          avatar: video.creator.avatar,
          followers: `${(Math.random() * 300 + 50).toFixed(0)}K`,
          isFollowing: followedCreators.includes(video.creatorId),
        });
      }
    }
    return Array.from(creatorMap.values()).slice(0, 5);
  }, [videos, followedCreators]);

  // Continue learning from progress
  const continueLearning = useMemo(() => {
    const inProgressCourses = microCourses.map(course => {
      const watchedVideosInCourse = progress.watchedVideos.filter(w =>
        course.videos.includes(w.videoId)
      ).length;
      const progressPercent = (watchedVideosInCourse / course.videos.length) * 100;

      return {
        id: course.id,
        title: course.title,
        thumbnail: course.thumbnail,
        progress: Math.round(progressPercent),
        videosCompleted: watchedVideosInCourse,
        totalVideos: course.videos.length,
      };
    }).filter(c => c.progress > 0 && c.progress < 100);

    return inProgressCourses.slice(0, 3);
  }, [microCourses, progress]);

  const handleTopicClick = (topic: string) => {
    setSearchQuery(topic);
  };

  const handleCreatorToggle = (creatorId: string, isFollowing: boolean) => {
    if (isFollowing) {
      unfollowCreator(creatorId);
    } else {
      followCreator(creatorId);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Header with Search */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-4">
        <h1 className="text-white text-2xl font-bold">Discover</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search topics, creators, courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100%-180px)] overflow-y-auto px-4 py-6 space-y-8">
        {/* Trending Topics */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-purple-400" size={20} />
            <h2 className="text-white font-semibold">Trending Topics</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic) => (
              <button key={topic.label} onClick={() => handleTopicClick(topic.label)} className="bg-transparent border-none p-0">
                <TrendingTopicPill {...topic} />
              </button>
            ))}
          </div>
        </section>

        {/* Search Results / Recommended */}
        <section>
          <h2 className="text-white font-semibold mb-4">
            {searchQuery ? 'Search Results' : 'Trending Now'}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {searchResults.slice(0, 6).map((video) => (
              <div key={video.id} className="bg-gray-800/30 rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-colors">
                <div className="relative aspect-[9/16] max-h-64">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 rounded px-2 py-0.5 text-xs text-white">
                    {video.duration}s
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {video.creator.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                    <Eye size={12} />
                    <span>{video.views >= 1000 ? `${(video.views / 1000).toFixed(0)}K` : video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Creators */}
        {!searchQuery && (
          <section>
            <h2 className="text-white font-semibold mb-4">Top Creators</h2>
            <div className="space-y-3">
              {topCreators.map((creator) => (
                <button key={creator.id} onClick={() => handleCreatorToggle(creator.id, creator.isFollowing)} className="w-full bg-transparent border-none p-0 text-left">
                  <CreatorCard {...creator} />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Continue Learning */}
        {!searchQuery && continueLearning.length > 0 && (
          <section className="pb-4">
            <h2 className="text-white font-semibold mb-4">Continue Learning</h2>
            <div className="space-y-3">
              {continueLearning.map((course) => (
                <CourseProgressCard key={course.id} {...course} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        onUploadClick={onNavigateToUpload}
        onSearchClick={onNavigateBack}
        onLibraryClick={onNavigateToLibrary}
        onProfileClick={onNavigateToProfile}
      />
    </div>
  );
}