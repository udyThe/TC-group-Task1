interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

export function MetricCard({ icon: Icon, label, value, color }: MetricCardProps) {
  return (
    <div className="bg-gray-800/30 border border-white/10 rounded-xl p-4 space-y-3 hover:border-purple-400/30 transition-colors">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} bg-opacity-20 flex items-center justify-center`}>
        <Icon className="text-white" size={20} />
      </div>
      <div>
        <p className="text-white text-2xl">{value}</p>
        <p className="text-gray-400 text-xs mt-1">{label}</p>
      </div>
    </div>
  );
}
