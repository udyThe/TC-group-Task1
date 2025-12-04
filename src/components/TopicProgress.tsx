interface TopicProgressProps {
  topic: string;
  progress: number;
  color: string;
}

export function TopicProgress({ topic, progress, color }: TopicProgressProps) {
  const circumference = 2 * Math.PI * 36; // radius = 36
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-gray-800/30 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 hover:border-purple-400/30 transition-colors">
      {/* Progress Circle */}
      <div className="relative w-20 h-20">
        <svg className="transform -rotate-90 w-20 h-20">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`bg-gradient-to-r ${color}`} stopColor="#a855f7" />
              <stop offset="100%" className={`bg-gradient-to-r ${color}`} stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white">{progress}%</span>
        </div>
      </div>

      {/* Topic Name */}
      <p className="text-gray-300 text-sm">{topic}</p>
    </div>
  );
}
