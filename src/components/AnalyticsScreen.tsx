import { useState } from 'react';
import { ArrowLeft, ChevronDown, Download, Eye, Clock, UserPlus, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { MetricCard } from './MetricCard';
import { TopVideoItem } from './TopVideoItem';

interface AnalyticsScreenProps {
  onNavigateBack: () => void;
}

export function AnalyticsScreen({ onNavigateBack }: AnalyticsScreenProps) {
  const [timePeriod, setTimePeriod] = useState('Last 7 Days');

  // Line chart data
  const viewsData = [
    { day: 'Mon', views: 1200 },
    { day: 'Tue', views: 1800 },
    { day: 'Wed', views: 1600 },
    { day: 'Thu', views: 2200 },
    { day: 'Fri', views: 2800 },
    { day: 'Sat', views: 3100 },
    { day: 'Sun', views: 2400 },
  ];

  // Pie chart data for audience insights
  const audienceData = [
    { name: 'Python', value: 35, color: '#3b82f6' },
    { name: 'Design', value: 25, color: '#ec4899' },
    { name: 'Marketing', value: 20, color: '#f59e0b' },
    { name: 'Data Science', value: 15, color: '#10b981' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  // Bar chart data for engagement
  const engagementData = [
    { name: 'Likes', value: 3420, color: '#a855f7' },
    { name: 'Shares', value: 1850, color: '#3b82f6' },
    { name: 'Saves', value: 2140, color: '#ec4899' },
  ];

  const topVideos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1509701852059-c221a6f1e878?w=200',
      title: 'Master Python in 60 Seconds',
      views: '4.2K',
      trend: 'up',
      trendValue: '+12%',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=200',
      title: 'React Hooks Explained',
      views: '3.8K',
      trend: 'up',
      trendValue: '+8%',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=200',
      title: 'Data Science Basics',
      views: '2.9K',
      trend: 'down',
      trendValue: '-3%',
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=200',
      title: 'CSS Grid Tutorial',
      views: '2.1K',
      trend: 'up',
      trendValue: '+5%',
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={onNavigateBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <h1 className="text-white flex-1">Analytics</h1>
        </div>

        {/* Time Period Selector */}
        <div className="relative">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100%-120px)] overflow-y-auto px-4 py-6 space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            icon={Eye}
            label="Total Views"
            value="12.5K"
            color="from-blue-500 to-cyan-500"
          />
          <MetricCard
            icon={Clock}
            label="Watch Time"
            value="340 hrs"
            color="from-purple-500 to-pink-500"
          />
          <MetricCard
            icon={UserPlus}
            label="New Followers"
            value="+234"
            color="from-green-500 to-emerald-500"
          />
          <MetricCard
            icon={TrendingUp}
            label="Engagement Rate"
            value="8.2%"
            color="from-orange-500 to-red-500"
          />
        </div>

        {/* Views Over Time Chart */}
        <div className="bg-gray-800/30 border border-white/10 rounded-xl p-4 space-y-3">
          <h3 className="text-white">Views Over Time</h3>
          <div className="w-full" style={{ height: '192px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fill="url(#colorViews)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Videos */}
        <div className="space-y-3">
          <h3 className="text-white">Top Performing Videos</h3>
          <div className="space-y-2">
            {topVideos.map((video) => (
              <TopVideoItem key={video.id} {...video} />
            ))}
          </div>
        </div>

        {/* Audience Insights */}
        <div className="bg-gray-800/30 border border-white/10 rounded-xl p-4 space-y-3">
          <h3 className="text-white">Topic Interests</h3>
          <div className="w-full" style={{ height: '192px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 justify-center">
            {audienceData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400 text-xs">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="bg-gray-800/30 border border-white/10 rounded-xl p-4 space-y-3">
          <h3 className="text-white">Engagement Breakdown</h3>
          <div className="w-full" style={{ height: '192px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Export Report Button */}
        <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 mb-4">
          <Download size={20} />
          Export Report
        </button>
      </div>
    </div>
  );
}