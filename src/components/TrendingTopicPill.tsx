interface TrendingTopicPillProps {
  label: string;
  color: string;
  icon: string;
}

export function TrendingTopicPill({ label, color, icon }: TrendingTopicPillProps) {
  return (
    <button className={`px-4 py-2 rounded-full bg-gradient-to-r ${color} bg-opacity-20 border border-white/20 hover:scale-105 transition-transform flex items-center gap-2`}>
      <span>{icon}</span>
      <span className="text-white text-sm">{label}</span>
    </button>
  );
}
