import { ArrowLeft, Plus, Users, Clock, PlayCircle, Edit2, ImagePlus } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VideoCard } from './VideoCard';

interface MicroCourseScreenProps {
  onNavigateBack: () => void;
}

export function MicroCourseScreen({ onNavigateBack }: MicroCourseScreenProps) {
  const [courseTitle, setCourseTitle] = useState('Python Basics in 10 Minutes');
  const [courseDescription, setCourseDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('Beginner');
  const [videos, setVideos] = useState([
    { id: 1, title: 'Introduction to Python', duration: 45, thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400' },
    { id: 2, title: 'Variables and Data Types', duration: 60, thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400' },
    { id: 3, title: 'Control Flow & Loops', duration: 75, thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400' },
    { id: 4, title: 'Functions in Python', duration: 50, thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400' },
    { id: 5, title: 'Lists and Dictionaries', duration: 65, thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400' },
    { id: 6, title: 'List Comprehensions', duration: 40, thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400' },
    { id: 7, title: 'Error Handling', duration: 55, thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400' },
    { id: 8, title: 'Final Project Setup', duration: 70, thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=400' },
  ]);

  const totalDuration = videos.reduce((acc, video) => acc + video.duration, 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  const deleteVideo = (id: number) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const moveVideo = (id: number, direction: 'up' | 'down') => {
    const index = videos.findIndex(v => v.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === videos.length - 1)) return;
    
    const newVideos = [...videos];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newVideos[index], newVideos[newIndex]] = [newVideos[newIndex], newVideos[index]];
    setVideos(newVideos);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <h1 className="text-white">Create Micro-Course</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100%-140px)] overflow-y-auto px-4 py-6 space-y-6">
        {/* Course Header */}
        <div className="space-y-4">
          {/* Cover Image */}
          <div className="relative h-40 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl overflow-hidden border border-purple-500/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjQ3OTQxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Course cover"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="px-4 py-2 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg text-white flex items-center gap-2 hover:bg-black/70 transition-colors">
                <ImagePlus size={18} />
                Change Cover
              </button>
            </div>
          </div>

          {/* Course Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <button className="w-10 h-10 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 flex items-center justify-center transition-colors">
                <Edit2 className="text-purple-300" size={18} />
              </button>
            </div>
          </div>

          {/* Course Stats */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <PlayCircle className="text-purple-400" size={18} />
                <span className="text-gray-300">{videos.length} videos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-purple-400" size={18} />
                <span className="text-gray-300">{totalMinutes} min total</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-purple-400" size={18} />
                <span className="text-gray-300">234 enrolled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="space-y-3">
          <label className="text-gray-300 text-sm">Target Audience</label>
          <div className="flex gap-3">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setTargetAudience(level)}
                className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                  targetAudience === level
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400/50 text-purple-200'
                    : 'bg-gray-800/50 border-white/10 text-gray-300 hover:border-purple-400/30'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Course Description */}
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Course Description</label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="Describe what learners will achieve in this micro-course..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
          />
        </div>

        {/* Video List */}
        <div className="space-y-3">
          <label className="text-gray-300 text-sm">Course Videos ({videos.length})</label>
          <div className="space-y-3">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                onDelete={deleteVideo}
                onMoveUp={() => moveVideo(video.id, 'up')}
                onMoveDown={() => moveVideo(video.id, 'down')}
                isFirst={index === 0}
                isLast={index === videos.length - 1}
              />
            ))}

            {/* Add More Videos Button */}
            <button className="w-full py-4 border-2 border-dashed border-purple-400/40 rounded-xl text-purple-300 hover:bg-purple-500/5 transition-colors flex items-center justify-center gap-2">
              <Plus size={20} />
              Add More Videos
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-4">
        <div className="flex gap-3">
          <button className="flex-1 px-6 py-3 border border-purple-400/40 rounded-xl text-purple-300 hover:bg-purple-500/10 transition-colors">
            Preview Course
          </button>
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Publish Course
          </button>
        </div>
      </div>
    </div>
  );
}
