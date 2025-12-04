import { ArrowLeft, Camera, Image, Clock, AlertCircle, ChevronDown, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TagPill } from './TagPill';

interface UploadScreenProps {
  onNavigateBack: () => void;
  onNavigateToMicroCourse: () => void;
  onNavigateToAnalytics: () => void;
}

export function UploadScreen({ onNavigateBack, onNavigateToMicroCourse, onNavigateToAnalytics }: UploadScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [duration, setDuration] = useState(45);
  const [addToCourse, setAddToCourse] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Python']);

  const popularTags = ['Python', 'JavaScript', 'Marketing', 'Design', 'Data Science', 'Finance'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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
          <h1 className="text-white flex-1">Upload Educational Video</h1>
          <button 
            onClick={onNavigateToAnalytics}
            className="w-10 h-10 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 transition-colors flex items-center justify-center"
          >
            <BarChart3 className="text-purple-300" size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100%-140px)] overflow-y-auto px-4 py-6 space-y-6">
        {/* Video Preview Area */}
        <div className="space-y-3">
          <label className="text-gray-300 text-sm">Video Preview</label>
          <div className="relative aspect-[9/16] max-h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1618371441505-be18023fbb98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGNhbWVyYSUyMHJlY29yZGluZ3xlbnwxfHx8fDE3NjQ4NDM5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Video preview"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-xl text-white flex items-center gap-2 transition-colors">
                    <Camera size={20} />
                    Record
                  </button>
                  <button className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-xl text-white flex items-center gap-2 transition-colors">
                    <Image size={20} />
                    Gallery
                  </button>
                </div>
                <p className="text-gray-400 text-sm">Upload a video (30-90 seconds)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Duration Indicator */}
        <div className="bg-gray-800/50 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="text-purple-400" size={20} />
              <span className="text-white">Duration: {duration} seconds</span>
            </div>
            {duration > 90 && (
              <div className="flex items-center gap-2 text-orange-400">
                <AlertCircle size={16} />
                <span className="text-sm">Exceeds 90s limit</span>
              </div>
            )}
          </div>
          {duration <= 90 && (
            <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ width: `${(duration / 90) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Video Title */}
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Python List Comprehensions Explained"
            className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe what students will learn..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
          />
        </div>

        {/* Difficulty Level */}
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Difficulty Level</label>
          <div className="relative">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Topic Tags */}
        <div className="space-y-3">
          <label className="text-gray-300 text-sm">Topic Tags</label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <TagPill
                key={tag}
                label={tag}
                isSelected={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
            <button className="px-4 py-2 border border-dashed border-purple-400/40 rounded-full text-purple-300 text-sm hover:bg-purple-500/10 transition-colors">
              + Add Custom Tag
            </button>
          </div>
        </div>

        {/* Add to Micro-Course */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-gray-300 text-sm">Add to Micro-Course</label>
            <button
              onClick={() => setAddToCourse(!addToCourse)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                addToCourse ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  addToCourse ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {addToCourse && (
            <div className="relative">
              <select 
                className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
                onChange={(e) => {
                  if (e.target.value === 'create') {
                    onNavigateToMicroCourse();
                  }
                }}
              >
                <option value="">Select existing course...</option>
                <option value="python">Python Basics</option>
                <option value="webdev">Web Development 101</option>
                <option value="create">+ Create New Course</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-4">
        <div className="flex gap-3">
          <button className="flex-1 px-6 py-3 border border-purple-400/40 rounded-xl text-purple-300 hover:bg-purple-500/10 transition-colors">
            Save as Draft
          </button>
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}