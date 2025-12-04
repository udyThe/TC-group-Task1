import { Search, TrendingUp, Play, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TrendingTopicPill } from './TrendingTopicPill';
import { VideoThumbnail } from './VideoThumbnail';
import { CreatorCard } from './CreatorCard';
import { CourseProgressCard } from './CourseProgressCard';
import { BottomNav } from './BottomNav';

interface SearchScreenProps {
  onNavigateBack: () => void;
  onNavigateToUpload?: () => void;
  onNavigateToLibrary?: () => void;
  onNavigateToProfile?: () => void;
}

export function SearchScreen({ onNavigateBack, onNavigateToUpload, onNavigateToLibrary, onNavigateToProfile }: SearchScreenProps) {
  const trendingTopics = [
    { label: 'Python', color: 'from-blue-500 to-cyan-500', icon: '🐍' },
    { label: 'AI', color: 'from-purple-500 to-pink-500', icon: '🤖' },
    { label: 'Marketing', color: 'from-orange-500 to-red-500', icon: '📊' },
    { label: 'Design', color: 'from-pink-500 to-rose-500', icon: '🎨' },
    { label: 'Excel', color: 'from-green-500 to-emerald-500', icon: '📈' },
    { label: 'Finance', color: 'from-yellow-500 to-orange-500', icon: '💰' },
  ];

  const recommendedVideos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1759984782106-4b56d0aa05b8?w=400',
      title: 'Master Python in 60 Seconds',
      creator: 'CodeMaster',
      views: '124K',
      duration: '60s',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=400',
      title: 'React Hooks Explained Simply',
      creator: 'WebDev Pro',
      views: '89K',
      duration: '45s',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400',
      title: 'CSS Grid Layout Tutorial',
      creator: 'Design Guru',
      views: '156K',
      duration: '75s',
    },
  ];

  const topCreators = [
    {
      id: 1,
      name: 'Dr. Sarah Kim',
      username: '@learnwithsarah',
      followers: '245K',
      avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200',
      isFollowing: false,
    },
    {
      id: 2,
      name: 'Prof. Mike Chen',
      username: '@profmike',
      followers: '189K',
      avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200',
      isFollowing: true,
    },
    {
      id: 3,
      name: 'Tech Teacher',
      username: '@techteach',
      followers: '312K',
      avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200',
      isFollowing: false,
    },
  ];

  const continueLearning = [
    {
      id: 1,
      title: 'Python Basics in 10 Minutes',
      thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400',
      progress: 60,
      videosCompleted: 6,
      totalVideos: 10,
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      thumbnail: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=400',
      progress: 30,
      videosCompleted: 3,
      totalVideos: 10,
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Header with Search */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-4">
        <h1 className="text-white">Discover</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search topics, creators, courses..."
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
            <h2 className="text-white">Trending Topics</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic) => (
              <TrendingTopicPill key={topic.label} {...topic} />
            ))}
          </div>
        </section>

        {/* Recommended for You */}
        <section>
          <h2 className="text-white mb-4">Recommended for You</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {recommendedVideos.map((video) => (
              <VideoThumbnail key={video.id} {...video} />
            ))}
          </div>
        </section>

        {/* Top Creators */}
        <section>
          <h2 className="text-white mb-4">Top Creators</h2>
          <div className="space-y-3">
            {topCreators.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        </section>

        {/* Continue Learning */}
        <section className="pb-4">
          <h2 className="text-white mb-4">Continue Learning</h2>
          <div className="space-y-3">
            {continueLearning.map((course) => (
              <CourseProgressCard key={course.id} {...course} />
            ))}
          </div>
        </section>
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