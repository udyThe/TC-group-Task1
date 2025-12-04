interface AchievementBadgeProps {
  icon: string;
  title: string;
  color: string;
  unlocked: boolean;
}

export function AchievementBadge({ icon, title, color, unlocked }: AchievementBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl transition-all ${
          unlocked
            ? `bg-gradient-to-br ${color} shadow-lg`
            : 'bg-gray-800/50 border border-white/10 grayscale opacity-50'
        }`}
      >
        {icon}
      </div>
      <p className={`text-xs text-center line-clamp-2 ${unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
        {title}
      </p>
    </div>
  );
}
