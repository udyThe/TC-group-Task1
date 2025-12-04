import { Video } from '../types';

export interface FeedAlgorithmParams {
  videos: Video[];
  userInterests: string[];
  followedCreators: string[];
  watchedVideos: string[];
  likedVideos: string[];
}

/**
 * Simple AI-based feed personalization algorithm
 * Scores videos based on:
 * - User interests match (40%)
 * - Followed creators (30%)
 * - Video popularity (20%)
 * - Freshness (10%)
 */
export const generatePersonalizedFeed = ({
  videos,
  userInterests,
  followedCreators,
  watchedVideos,
  likedVideos,
}: FeedAlgorithmParams): Video[] => {
  // Filter out already watched videos
  const unwatchedVideos = videos.filter(v => !watchedVideos.includes(v.id));
  
  // Score each video
  const scoredVideos = unwatchedVideos.map(video => {
    let score = 0;

    // Interest match score (40 points max)
    const topicMatches = video.topics.filter(topic =>
      userInterests.some(interest => 
        interest.toLowerCase() === topic.toLowerCase()
      )
    ).length;
    const interestScore = Math.min(40, topicMatches * 15);
    score += interestScore;

    // Followed creator score (30 points)
    if (followedCreators.includes(video.creatorId)) {
      score += 30;
    }

    // Popularity score (20 points max)
    const popularityScore = Math.min(20, (video.likes / 1000) * 2);
    score += popularityScore;

    // Freshness score (10 points max)
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(video.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    const freshnessScore = Math.max(0, 10 - daysSinceCreated);
    score += freshnessScore;

    // Bonus for videos from liked video creators
    const creatorOfLikedVideo = likedVideos.some(likedId => {
      const likedVideo = videos.find(v => v.id === likedId);
      return likedVideo?.creatorId === video.creatorId;
    });
    if (creatorOfLikedVideo) {
      score += 10;
    }

    return { video, score };
  });

  // Sort by score descending
  scoredVideos.sort((a, b) => b.score - a.score);

  // Add some randomization to top videos to keep feed fresh
  const topVideos = scoredVideos.slice(0, 10);
  const shuffledTop = shuffleArray(topVideos);
  const rest = scoredVideos.slice(10);

  return [...shuffledTop.map(s => s.video), ...rest.map(s => s.video)];
};

/**
 * Get trending videos based on recent engagement
 */
export const getTrendingVideos = (videos: Video[], limit: number = 10): Video[] => {
  const scoredVideos = videos.map(video => {
    // Calculate engagement score
    const engagementRate = (video.likes + video.comments * 2) / Math.max(video.views, 1);
    const recencyBonus = Math.max(0, 7 - Math.floor(
      (Date.now() - new Date(video.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    ));
    
    const score = (engagementRate * 1000) + (recencyBonus * 100);
    return { video, score };
  });

  return scoredVideos
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.video);
};

/**
 * Get recommended videos based on a specific video
 */
export const getRelatedVideos = (
  video: Video,
  allVideos: Video[],
  limit: number = 5
): Video[] => {
  const scoredVideos = allVideos
    .filter(v => v.id !== video.id)
    .map(v => {
      let score = 0;

      // Same creator
      if (v.creatorId === video.creatorId) {
        score += 30;
      }

      // Topic overlap
      const sharedTopics = v.topics.filter(t => video.topics.includes(t)).length;
      score += sharedTopics * 15;

      // Same skill level
      if (v.skillLevel === video.skillLevel) {
        score += 10;
      }

      // Same category
      if (v.category === video.category) {
        score += 10;
      }

      return { video: v, score };
    });

  return scoredVideos
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.video);
};

/**
 * Search videos with relevance scoring
 */
export const searchVideos = (
  videos: Video[],
  query: string,
  filters?: {
    category?: string;
    skillLevel?: string;
    topics?: string[];
  }
): Video[] => {
  const lowerQuery = query.toLowerCase();

  let filtered = videos;

  // Apply filters
  if (filters?.category) {
    filtered = filtered.filter(v => v.category === filters.category);
  }
  if (filters?.skillLevel) {
    filtered = filtered.filter(v => v.skillLevel === filters.skillLevel);
  }
  if (filters?.topics && filters.topics.length > 0) {
    filtered = filtered.filter(v =>
      v.topics.some(t => filters.topics!.includes(t))
    );
  }

  // Score based on query match
  const scoredVideos = filtered.map(video => {
    let score = 0;

    if (video.title.toLowerCase().includes(lowerQuery)) {
      score += 50;
    }
    if (video.description.toLowerCase().includes(lowerQuery)) {
      score += 30;
    }
    if (video.topics.some(t => t.toLowerCase().includes(lowerQuery))) {
      score += 40;
    }
    if (video.tags.some(t => t.toLowerCase().includes(lowerQuery))) {
      score += 35;
    }
    if (video.creator.name.toLowerCase().includes(lowerQuery)) {
      score += 25;
    }

    return { video, score };
  });

  return scoredVideos
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.video);
};

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
