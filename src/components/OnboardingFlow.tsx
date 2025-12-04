import { useState } from 'react';
import { OnboardingScreen } from './OnboardingScreen';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const screens = [
    {
      illustration: 'screen1',
      heading: 'Learn in 60 Seconds',
      description: 'Master new skills with bite-sized video lessons designed for your busy lifestyle. Quick, effective, and engaging.',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-blue-500',
    },
    {
      illustration: 'screen2',
      heading: 'Follow Expert Creators',
      description: 'Learn from industry professionals and expert educators sharing their knowledge in short, impactful videos.',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-orange-500',
    },
    {
      illustration: 'screen3',
      heading: 'Track Your Progress',
      description: 'Stay motivated with achievement badges, streaks, and personalized learning stats. Make progress visible.',
      gradientFrom: 'from-cyan-500',
      gradientTo: 'to-purple-500',
    },
  ];

  const handleNext = () => {
    if (currentStep < screens.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-black">
      <OnboardingScreen
        {...screens[currentStep]}
        currentStep={currentStep}
        totalSteps={screens.length}
        onNext={handleNext}
        onSkip={handleSkip}
        isLastStep={currentStep === screens.length - 1}
      />
    </div>
  );
}
