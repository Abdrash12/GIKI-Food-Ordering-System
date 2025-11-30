import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Utensils, Clock, ArrowLeft } from 'lucide-react';

interface OnboardingCarouselProps {
  onSkip: () => void;
  onGetStarted: () => void;
}

const slides = [
  {
    icon: Utensils,
    title: 'Order from TUC to your Hostel',
    description: 'Browse menus from your favorite campus vendors',
    color: '#FF6B00'
  },
  {
    icon: Clock,
    title: 'Fast & Reliable Delivery',
    description: 'Get your food delivered in minutes',
    color: '#007AFF'
  },
  {
    icon: BookOpen,
    title: 'Focus on What Matters',
    description: 'We handle the food, you handle the grades',
    color: '#FF6B00'
  }
];

export function OnboardingCarousel({ onSkip, onGetStarted }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onGetStarted();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {currentSlide > 0 && (
        <button
          onClick={handleBack}
          className="absolute top-8 left-6 w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{ backgroundColor: '#F7F8FA' }}
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
      )}
      <button
        onClick={onSkip}
        className="absolute top-8 right-6 text-gray-500 z-10"
      >
        Skip
      </button>

      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mb-12 flex justify-center">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center"
                style={{ backgroundColor: slides[currentSlide].color + '20' }}
              >
                {(() => {
                  const Icon = slides[currentSlide].icon;
                  return (
                    <Icon 
                      className="w-16 h-16"
                      style={{ color: slides[currentSlide].color }}
                    />
                  );
                })()}
              </div>
            </div>
            <h2 className="mb-4 px-8" style={{ color: '#1F2937' }}>
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-600 px-4">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pb-12 px-8">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: currentSlide === index ? '32px' : '8px',
                backgroundColor: currentSlide === index ? '#FF6B00' : '#E5E7EB'
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-full text-white transition-transform active:scale-95"
          style={{ backgroundColor: '#FF6B00' }}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}