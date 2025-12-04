interface TagPillProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TagPill({ label, isSelected, onClick }: TagPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-all ${
        isSelected
          ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/50 text-purple-200'
          : 'bg-gray-800/50 border border-white/10 text-gray-300 hover:border-purple-400/30'
      }`}
    >
      {label}
    </button>
  );
}
