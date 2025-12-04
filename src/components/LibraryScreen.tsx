import { useState } from 'react';
import { BottomNav } from './BottomNav';
import { FilterChip } from './FilterChip';
import { SavedVideoCard } from './SavedVideoCard';
import { PlaylistCard } from './PlaylistCard';
import { Plus } from 'lucide-react';

interface LibraryScreenProps {
  onNavigateBack: () => void;
  onNavigateToUpload?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToProfile?: () => void;
}

export function LibraryScreen({ onNavigateBack, onNavigateToUpload, onNavigateToSearch, onNavigateToProfile }: LibraryScreenProps) {
  const [activeTab, setActiveTab] = useState<'saved' | 'playlists'>('saved');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'In Progress', 'Completed'];

  const savedVideos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1509701852059-c221a6f1e878?w=400',
      title: 'Master Python in 60 Seconds',
      creator: 'CodeMaster',
      duration: '60s',
      progress: 100,
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400',
      title: 'React Hooks Explained',
      creator: 'WebDev Pro',
      duration: '45s',
      progress: 60,
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=400',
      title: 'Data Science Basics',
      creator: 'DataGuru',
      duration: '75s',
      progress: 0,
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400',
      title: 'CSS Grid Layout Tutorial',
      creator: 'Design Guru',
      duration: '50s',
      progress: 30,
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=400',
      title: 'JavaScript Arrays Deep Dive',
      creator: 'JS Expert',
      duration: '65s',
      progress: 100,
    },
    {
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1509701852059-c221a6f1e878?w=400',
      title: 'TypeScript for Beginners',
      creator: 'TypeScript Pro',
      duration: '55s',
      progress: 0,
    },
  ];

  const playlists = [
    {
      id: 1,
      name: 'Python Mastery',
      videoCount: 12,
      totalDuration: '15 min',
      thumbnails: [
        'https://images.unsplash.com/photo-1509701852059-c221a6f1e878?w=200',
        'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=200',
        'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=200',
        'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=200',
      ],
    },
    {
      id: 2,
      name: 'Web Development Fundamentals',
      videoCount: 8,
      totalDuration: '10 min',
      thumbnails: [
        'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=200',
        'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=200',
        'https://images.unsplash.com/photo-1509701852059-c221a6f1e878?w=200',
        'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=200',
      ],
    },
    {
      id: 3,
      name: 'Data Science Journey',
      videoCount: 10,
      totalDuration: '12 min',
      thumbnails: [
        'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=200',
        'https://images.unsplash.com/photo-1509701852059-c221a6f1e878?w=200',
        'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=200',
        'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=200',
      ],
    },
  ];

  const filteredVideos = savedVideos.filter(video => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'In Progress') return video.progress > 0 && video.progress < 100;
    if (activeFilter === 'Completed') return video.progress === 100;
    return true;
  });

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-4">
        <h1 className="text-white">Library</h1>
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'saved'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:text-gray-300'
            }`}
          >
            Saved Videos
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'playlists'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:text-gray-300'
            }`}
          >
            My Playlists
          </button>
        </div>

        {/* Filter Chips */}
        {activeTab === 'saved' && (
          <div className="flex gap-2">
            {filters.map((filter) => (
              <FilterChip
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100%-200px)] overflow-y-auto px-4 py-6">
        {activeTab === 'saved' ? (
          <div className="grid grid-cols-2 gap-3 pb-4">
            {filteredVideos.map((video) => (
              <SavedVideoCard key={video.id} {...video} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {/* Create New Playlist Card */}
            <button className="w-full h-32 border-2 border-dashed border-purple-400/40 rounded-xl text-purple-300 hover:bg-purple-500/5 transition-colors flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Plus size={24} />
              </div>
              <span>Create New Playlist</span>
            </button>

            {/* Playlist Cards */}
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} {...playlist} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        onUploadClick={onNavigateToUpload}
        onSearchClick={onNavigateToSearch}
        onLibraryClick={onNavigateBack}
        onProfileClick={onNavigateToProfile}
      />
    </div>
  );
}