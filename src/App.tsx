import { VideoPlayer } from './components/VideoPlayer';
import { UploadScreen } from './components/UploadScreen';
import { MicroCourseScreen } from './components/MicroCourseScreen';
import { SearchScreen } from './components/SearchScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { useState } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'player' | 'upload' | 'microcourse' | 'search' | 'library' | 'profile' | 'analytics'>('onboarding');

  const handleOnboardingComplete = () => {
    setCurrentScreen('player');
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="relative w-full max-w-[430px] h-full bg-gradient-to-br from-gray-900 to-black">
        {currentScreen === 'onboarding' && (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        )}
        {currentScreen === 'player' && (
          <VideoPlayer 
            onNavigateToUpload={() => setCurrentScreen('upload')} 
            onNavigateToSearch={() => setCurrentScreen('search')}
            onNavigateToLibrary={() => setCurrentScreen('library')}
            onNavigateToProfile={() => setCurrentScreen('profile')}
          />
        )}
        {currentScreen === 'upload' && (
          <UploadScreen 
            onNavigateBack={() => setCurrentScreen('player')} 
            onNavigateToMicroCourse={() => setCurrentScreen('microcourse')}
            onNavigateToAnalytics={() => setCurrentScreen('analytics')}
          />
        )}
        {currentScreen === 'microcourse' && <MicroCourseScreen onNavigateBack={() => setCurrentScreen('upload')} />}
        {currentScreen === 'search' && (
          <SearchScreen 
            onNavigateBack={() => setCurrentScreen('player')}
            onNavigateToUpload={() => setCurrentScreen('upload')}
            onNavigateToLibrary={() => setCurrentScreen('library')}
            onNavigateToProfile={() => setCurrentScreen('profile')}
          />
        )}
        {currentScreen === 'library' && (
          <LibraryScreen 
            onNavigateBack={() => setCurrentScreen('player')}
            onNavigateToUpload={() => setCurrentScreen('upload')}
            onNavigateToSearch={() => setCurrentScreen('search')}
            onNavigateToProfile={() => setCurrentScreen('profile')}
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen 
            onNavigateBack={() => setCurrentScreen('player')}
            onNavigateToUpload={() => setCurrentScreen('upload')}
            onNavigateToSearch={() => setCurrentScreen('search')}
            onNavigateToLibrary={() => setCurrentScreen('library')}
          />
        )}
        {currentScreen === 'analytics' && <AnalyticsScreen onNavigateBack={() => setCurrentScreen('upload')} />}
      </div>
    </div>
  );
}