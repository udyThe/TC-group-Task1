export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isCreator: boolean;
  interests: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number; // in seconds
  creatorId: string;
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  topics: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  likes: number;
  views: number;
  comments: number;
  createdAt: Date;
  tags: string[];
  category: string;
}

export interface MicroCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  creatorId: string;
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  videos: string[]; // video IDs
  topics: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  totalDuration: number;
  enrollments: number;
  rating: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  likes: number;
  replies: Comment[];
  createdAt: Date;
}

export interface Playlist {
  id: string;
  name: string;
  userId: string;
  videoIds: string[];
  thumbnail?: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface Progress {
  userId: string;
  watchedVideos: {
    videoId: string;
    watchedAt: Date;
    completed: boolean;
    watchTime: number;
  }[];
  completedCourses: {
    courseId: string;
    completedAt: Date;
    score?: number;
  }[];
  streakDays: number;
  totalWatchTime: number;
  achievements: string[];
}

export interface Quiz {
  id: string;
  videoId: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
