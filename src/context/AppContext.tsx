import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { User, Video, MicroCourse, Progress, Playlist, Comment } from '../types';
import { mockUsers, mockVideos, mockMicroCourses } from '../data/mockData';

interface AppContextType {
  // User state
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  followedCreators: string[];
  followCreator: (creatorId: string) => void;
  unfollowCreator: (creatorId: string) => void;
  
  // Videos
  videos: Video[];
  getVideoById: (id: string) => Video | undefined;
  likeVideo: (videoId: string) => void;
  unlikeVideo: (videoId: string) => void;
  likedVideos: string[];
  
  // Micro courses
  microCourses: MicroCourse[];
  getCourseById: (id: string) => MicroCourse | undefined;
  
  // Playlists
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  addToPlaylist: (playlistId: string, videoId: string) => void;
  removeFromPlaylist: (playlistId: string, videoId: string) => void;
  
  // Progress
  progress: Progress;
  markVideoWatched: (videoId: string, watchTime: number) => void;
  markCourseCompleted: (courseId: string, score?: number) => void;
  
  // Comments
  comments: { [videoId: string]: Comment[] };
  addComment: (videoId: string, content: string) => void;
  
  // Feed personalization
  userInterests: string[];
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [microCourses] = useState<MicroCourse[]>(mockMicroCourses);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: 'p1',
      name: 'Watch Later',
      userId: '1',
      videoIds: [],
      isPublic: false,
      createdAt: new Date(),
    },
    {
      id: 'p2',
      name: 'Favorites',
      userId: '1',
      videoIds: [],
      isPublic: true,
      createdAt: new Date(),
    },
  ]);
  const [progress, setProgress] = useState<Progress>({
    userId: '1',
    watchedVideos: [],
    completedCourses: [],
    streakDays: 5,
    totalWatchTime: 3600,
    achievements: ['early_adopter', 'first_video', 'week_streak'],
  });
  const [comments, setComments] = useState<{ [videoId: string]: Comment[] }>({});
  const [userInterests, setUserInterests] = useState<string[]>([
    'React',
    'JavaScript',
    'Design',
  ]);

  // Initialize current user
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(mockUsers[0]);
    }
  }, [currentUser]);

  const followCreator = (creatorId: string) => {
    if (!followedCreators.includes(creatorId)) {
      setFollowedCreators([...followedCreators, creatorId]);
    }
  };

  const unfollowCreator = (creatorId: string) => {
    setFollowedCreators(followedCreators.filter((id: string) => id !== creatorId));
  };

  const getVideoById = (id: string) => {
    return videos.find((v: Video) => v.id === id);
  };

  const getCourseById = (id: string) => {
    return microCourses.find((c: MicroCourse) => c.id === id);
  };

  const likeVideo = (videoId: string) => {
    if (!likedVideos.includes(videoId)) {
      setLikedVideos([...likedVideos, videoId]);
      setVideos(videos.map((v: Video) => 
        v.id === videoId ? { ...v, likes: v.likes + 1 } : v
      ));
    }
  };

  const unlikeVideo = (videoId: string) => {
    setLikedVideos(likedVideos.filter((id: string) => id !== videoId));
    setVideos(videos.map((v: Video) => 
      v.id === videoId ? { ...v, likes: Math.max(0, v.likes - 1) } : v
    ));
  };

  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: `p${playlists.length + 1}`,
      name,
      userId: currentUser?.id || '1',
      videoIds: [],
      isPublic: false,
      createdAt: new Date(),
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const addToPlaylist = (playlistId: string, videoId: string) => {
    setPlaylists(playlists.map((p: Playlist) => {
      if (p.id === playlistId && !p.videoIds.includes(videoId)) {
        return { ...p, videoIds: [...p.videoIds, videoId] };
      }
      return p;
    }));
  };

  const removeFromPlaylist = (playlistId: string, videoId: string) => {
    setPlaylists(playlists.map((p: Playlist) => {
      if (p.id === playlistId) {
        return { ...p, videoIds: p.videoIds.filter((id: string) => id !== videoId) };
      }
      return p;
    }));
  };

  const markVideoWatched = (videoId: string, watchTime: number) => {
    const video = getVideoById(videoId);
    if (!video) return;

    const isCompleted = watchTime >= video.duration * 0.8; // 80% watched = completed
    
    setProgress((prev: Progress) => {
      const existing = prev.watchedVideos.find((w: { videoId: string; watchedAt: Date; completed: boolean; watchTime: number }) => w.videoId === videoId);
      if (existing) {
        return {
          ...prev,
          watchedVideos: prev.watchedVideos.map((w: { videoId: string; watchedAt: Date; completed: boolean; watchTime: number }) =>
            w.videoId === videoId
              ? { ...w, watchTime, completed: isCompleted, watchedAt: new Date() }
              : w
          ),
          totalWatchTime: prev.totalWatchTime + watchTime,
        };
      } else {
        return {
          ...prev,
          watchedVideos: [
            ...prev.watchedVideos,
            {
              videoId,
              watchedAt: new Date(),
              completed: isCompleted,
              watchTime,
            },
          ],
          totalWatchTime: prev.totalWatchTime + watchTime,
        };
      }
    });

    // Increment view count
    setVideos(videos.map((v: Video) => 
      v.id === videoId ? { ...v, views: v.views + 1 } : v
    ));
  };

  const markCourseCompleted = (courseId: string, score?: number) => {
    setProgress((prev: Progress) => ({
      ...prev,
      completedCourses: [
        ...prev.completedCourses,
        {
          courseId,
          completedAt: new Date(),
          score,
        },
      ],
    }));
  };

  const addComment = (videoId: string, content: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      videoId,
      userId: currentUser?.id || '1',
      user: {
        name: currentUser?.name || 'Anonymous',
        username: currentUser?.username || '@anonymous',
        avatar: currentUser?.avatar || 'https://i.pravatar.cc/150',
      },
      content,
      likes: 0,
      replies: [],
      createdAt: new Date(),
    };

    setComments((prev: { [videoId: string]: Comment[] }) => ({
      ...prev,
      [videoId]: [...(prev[videoId] || []), newComment],
    }));

    // Increment comment count
    setVideos(videos.map((v: Video) => 
      v.id === videoId ? { ...v, comments: v.comments + 1 } : v
    ));
  };

  const addInterest = (interest: string) => {
    if (!userInterests.includes(interest)) {
      setUserInterests([...userInterests, interest]);
    }
  };

  const removeInterest = (interest: string) => {
    setUserInterests(userInterests.filter((i: string) => i !== interest));
  };

  const value: AppContextType = useMemo(() => ({
    currentUser,
    setCurrentUser,
    followedCreators,
    followCreator,
    unfollowCreator,
    videos,
    getVideoById,
    likeVideo,
    unlikeVideo,
    likedVideos,
    microCourses,
    getCourseById,
    playlists,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    progress,
    markVideoWatched,
    markCourseCompleted,
    comments,
    addComment,
    userInterests,
    addInterest,
    removeInterest,
  }), [
    currentUser,
    followedCreators,
    followCreator,
    unfollowCreator,
    videos,
    getVideoById,
    likeVideo,
    unlikeVideo,
    likedVideos,
    microCourses,
    getCourseById,
    playlists,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    progress,
    markVideoWatched,
    markCourseCompleted,
    comments,
    addComment,
    userInterests,
    addInterest,
    removeInterest,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
