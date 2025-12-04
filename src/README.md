# Educational Video Platform

A mobile educational video platform similar to TikTok/Instagram Reels but focused on learning content. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎬 **Video Player Screen** - Swipeable short-form educational videos (30-90 seconds)
- 📤 **Upload Screen** - Content creation interface for educators
- 📚 **Micro-Course Builder** - Structure videos into learning sequences
- 🔍 **Search & Discovery** - Trending topics and recommendations
- 📖 **Library** - Saved videos, playlists, and watch history
- 👤 **Profile Screen** - Learning achievements, stats, and badges
- 📊 **Analytics Dashboard** - Creator insights with charts and metrics
- 🎯 **Onboarding Flow** - 3-screen welcome experience

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS 4.0
- Vite
- Recharts (for analytics)
- Lucide React (icons)

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Download all files to your PC** and organize them according to the file structure shown above.

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## File Structure

```
educational-video-platform/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── index.html
├── main.tsx
├── App.tsx
├── styles/
│   └── globals.css
└── components/
    ├── VideoPlayer.tsx
    ├── UploadScreen.tsx
    ├── MicroCourseScreen.tsx
    ├── SearchScreen.tsx
    ├── LibraryScreen.tsx
    ├── ProfileScreen.tsx
    ├── AnalyticsScreen.tsx
    ├── OnboardingFlow.tsx
    ├── OnboardingScreen.tsx
    ├── BottomNav.tsx
    ├── FloatingActions.tsx
    ├── VideoInfo.tsx
    ├── TagPill.tsx
    ├── TrendingTopicPill.tsx
    ├── VideoThumbnail.tsx
    ├── CreatorCard.tsx
    ├── CourseProgressCard.tsx
    ├── PlaylistCard.tsx
    ├── SavedVideoCard.tsx
    ├── StatCard.tsx
    ├── AchievementBadge.tsx
    ├── TopicProgress.tsx
    ├── RecentActivityItem.tsx
    ├── MetricCard.tsx
    ├── TopVideoItem.tsx
    └── figma/
        └── ImageWithFallback.tsx
```

## Navigation Flow

```
Onboarding (3 screens)
    ↓
Video Player (Home)
    ├── → Upload Screen → Micro-Course Builder
    ├── → Search Screen
    ├── → Library Screen
    └── → Profile Screen

Upload Screen
    └── → Analytics Dashboard
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Design Features

- 📱 Mobile-first responsive design (max-width: 430px)
- 🌙 Dark mode with purple/blue gradients
- ✨ Smooth animations and transitions
- 📊 Interactive charts and visualizations
- 🎨 Modern, clean UI with card-based layouts
- 🔄 Swipeable content and draggable lists

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
