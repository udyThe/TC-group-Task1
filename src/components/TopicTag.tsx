interface TopicTagProps {
  label: string;
}

export function TopicTag({ label }: TopicTagProps) {
  return (
    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 backdrop-blur-sm">
      <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent text-sm">
        {label}
      </span>
    </span>
  );
}
