interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full transition-all text-sm ${
        isActive
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
          : 'bg-gray-800/50 border border-white/10 text-gray-400 hover:text-gray-300 hover:border-purple-400/30'
      }`}
    >
      {label}
    </button>
  );
}
