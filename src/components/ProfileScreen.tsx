import { useState } from 'react';
import { Settings, Edit2, Play, Award, Flame, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BottomNav } from './BottomNav';
import { StatCard } from './StatCard';
import { AchievementBadge } from './AchievementBadge';
import { TopicProgress } from './TopicProgress';
import { RecentActivityItem } from './RecentActivityItem';

interface ProfileScreenProps {
  onNavigateBack: () => void;
  onNavigateToUpload?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToLibrary?: () => void;
}

export function ProfileScreen({ onNavigateBack, onNavigateToUpload, onNavigateToSearch, onNavigateToLibrary }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'achievements' | 'following'>('activity');

  const stats = [
    { icon: Play, label: 'Videos Watched', value: '127', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Courses Completed', value: '8', color: 'from-purple-500 to-pink-500' },
    { icon: Flame, label: 'Day Streak', value: '45', color: 'from-orange-500 to-red-500' },
  ];

  const achievements = [
    { id: 1, icon: '🎬', title: 'First Video', color: 'from-blue-500 to-cyan-500', unlocked: true },
    { id: 2, icon: '🔥', title: 'Week Streak', color: 'from-orange-500 to-red-500', unlocked: true },
    { id: 3, icon: '🎓', title: 'Course Completed', color: 'from-purple-500 to-pink-500', unlocked: true },
    { id: 4, icon: '⭐', title: '100 Videos', color: 'from-yellow-500 to-orange-500', unlocked: true },
    { id: 5, icon: '💎', title: 'Premium Learner', color: 'from-cyan-500 to-blue-500', unlocked: true },
    { id: 6, icon: '🚀', title: 'Speed Learner', color: 'from-pink-500 to-rose-500', unlocked: true },
    { id: 7, icon: '🏆', title: 'Top 10%', color: 'from-yellow-400 to-orange-400', unlocked: false },
    { id: 8, icon: '👑', title: 'Master', color: 'from-purple-400 to-pink-400', unlocked: false },
  ];

  const topicProgress = [
    { topic: 'Python', progress: 60, color: 'from-blue-500 to-cyan-500' },
    { topic: 'Design', progress: 30, color: 'from-pink-500 to-rose-500' },
    { topic: 'Marketing', progress: 45, color: 'from-orange-500 to-red-500' },
    { topic: 'JavaScript', progress: 75, color: 'from-yellow-500 to-orange-500' },
  ];

  const recentActivity = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1509701852059-c221a6f1e878?w=200',
      title: 'Master Python in 60 Seconds',
      creator: 'CodeMaster',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=200',
      title: 'React Hooks Explained',
      creator: 'WebDev Pro',
      timeAgo: '5 hours ago',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=200',
      title: 'Data Science Basics',
      creator: 'DataGuru',
      timeAgo: '1 day ago',
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=200',
      title: 'CSS Grid Layout Tutorial',
      creator: 'Design Guru',
      timeAgo: '2 days ago',
    },
  ];

  const following = [
    {
      id: 1,
      name: 'Dr. Sarah Kim',
      username: '@learnwithsarah',
      avatar: 'https://images.unsplash.com/photo-1595436222774-4b1cd819aada?w=200',
      followers: '245K',
    },
    {
      id: 2,
      name: 'Prof. Mike Chen',
      username: '@profmike',
      avatar: 'https://images.unsplash.com/photo-1595436222774-4b1cd819aada?w=200',
      followers: '189K',
    },
    {
      id: 3,
      name: 'Tech Teacher',
      username: '@techteach',
      avatar: 'https://images.unsplash.com/photo-1595436222774-4b1cd819aada?w=200',
      followers: '312K',
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Header with Settings */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white">Profile</h1>
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
            <Settings className="text-white" size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100%-160px)] overflow-y-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQ4NDI2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Username and Bio */}
          <div className="text-center space-y-2">
            <h2 className="text-white">Alex Johnson</h2>
            <p className="text-gray-400 text-sm">@alexlearns</p>
            <p className="text-gray-300 text-sm max-w-xs">
              Passionate learner exploring tech, design, and business. Always curious! 🚀
            </p>
          </div>

          {/* Edit Profile Button */}
          <button className="px-6 py-2 border border-purple-400/40 rounded-xl text-purple-300 hover:bg-purple-500/10 transition-colors flex items-center gap-2">
            <Edit2 size={16} />
            Edit Profile
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          {['activity', 'achievements', 'following'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`flex-1 py-3 text-sm capitalize transition-all ${
                activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Learning Stats */}
            <div>
              <h3 className="text-white mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-purple-400" />
                Learning Progress
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {topicProgress.map((topic, index) => (
                  <TopicProgress key={index} {...topic} />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Play size={20} className="text-purple-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <RecentActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Award size={20} className="text-purple-400" />
              Achievement Badges
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} {...achievement} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'following' && (
          <div className="space-y-3 pb-4">
            {following.map((creator) => (
              <div
                key={creator.id}
                className="bg-gray-800/30 border border-white/10 rounded-xl p-4 hover:border-purple-400/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                      <ImageWithFallback
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white truncate">{creator.name}</h3>
                    <p className="text-gray-400 text-sm">{creator.username}</p>
                    <p className="text-gray-500 text-xs">{creator.followers} followers</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-700 border border-white/10 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors text-sm">
                    Following
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        onUploadClick={onNavigateToUpload}
        onSearchClick={onNavigateToSearch}
        onLibraryClick={onNavigateToLibrary}
        onProfileClick={onNavigateBack}
      />
    </div>
  );
}