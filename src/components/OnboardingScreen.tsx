import { ImageWithFallback } from './figma/ImageWithFallback';
import { Play, Users, Award, Sparkles, TrendingUp, Target } from 'lucide-react';

interface OnboardingScreenProps {
  illustration: string;
  heading: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
  isLastStep: boolean;
}

export function OnboardingScreen({
  illustration,
  heading,
  description,
  gradientFrom,
  gradientTo,
  currentStep,
  totalSteps,
  onNext,
  onSkip,
  isLastStep,
}: OnboardingScreenProps) {
  return (
    <div className="h-full flex flex-col px-6 py-12">
      {/* Skip Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onSkip}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center">
        {illustration === 'screen1' && (
          <div className="relative w-full max-w-sm">
            {/* Phone Frame */}
            <div className={`relative aspect-[9/16] max-w-[280px] mx-auto bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-[3rem] p-3 shadow-2xl shadow-purple-500/50`}>
              <div className="w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                {/* Video Content */}
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758270704522-f091f8064a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjQ4NDUwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Learning"
                  className="w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg`}>
                    <Play className="text-white fill-white ml-1" size={24} />
                  </div>
                </div>
                {/* Time Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
                  <Sparkles size={14} />
                  60s
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
              <Target className="text-white" size={24} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
        )}

        {illustration === 'screen2' && (
          <div className="relative w-full max-w-sm">
            {/* Creator Profiles Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl p-1 shadow-lg hover:scale-105 transition-transform`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="bg-gray-800 rounded-2xl p-4 h-32 flex flex-col items-center justify-center">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} mb-2`}>
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBncm91cHxlbnwxfHx8fDE3NjQ4NDUwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Creator"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <p className="text-white text-xs">Expert {i}</p>
                    <p className="text-gray-400 text-xs">245K</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Floating Users Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <Users className="text-white" size={32} />
            </div>
          </div>
        )}

        {illustration === 'screen3' && (
          <div className="relative w-full max-w-sm">
            {/* Progress Dashboard */}
            <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-3xl p-1 shadow-2xl`}>
              <div className="bg-gray-900 rounded-3xl p-6 space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Videos', value: '127', icon: '🎬' },
                    { label: 'Courses', value: '8', icon: '📚' },
                    { label: 'Streak', value: '45', icon: '🔥' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <p className="text-white">{stat.value}</p>
                      <p className="text-gray-400 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>
                {/* Badges */}
                <div className="flex gap-2 justify-center">
                  {['🏆', '⭐', '💎', '👑'].map((emoji, i) => (
                    <div
                      key={i}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center text-2xl shadow-lg`}
                      style={{
                        animationDelay: `${i * 0.2}s`,
                      }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Level 12</span>
                    <span className="text-gray-400">75%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`} style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Award Icon */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50 animate-bounce">
              <Award className="text-white" size={32} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 text-center mt-8">
        <h1 className="text-white text-3xl">{heading}</h1>
        <p className="text-gray-400 text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? `w-8 bg-gradient-to-r ${gradientFrom} ${gradientTo}`
                : 'w-2 bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className={`w-full mt-8 px-6 py-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all`}
      >
        {isLastStep ? 'Get Started' : 'Next'}
      </button>
    </div>
  );
}
