import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

import T1 from '@/assets/illustrations/illustration-tutorial-1.svg';
import T2 from '@/assets/illustrations/illustration-tutorial-2.svg';
import T3 from '@/assets/illustrations/illustration-tutorial-3.svg';

const stepIllustrations = [T1, T2, T3];

const STEPS = [
  {
    title: 'Step 1',
    description: 'Tekan dan tahan layar untuk menyalakan sentermu!',
    illustration: '/assets/illustrations/tutorial-1.png',
  },
  {
    title: 'Step 2',
    description: 'Geser cahaya untuk mencari objek yang tersembunyi',
    illustration: '/assets/illustrations/tutorial-2.png',
  },
  {
    title: 'Step 3',
    description: 'Temukan yang sesuai instruksi, lalu angkat jarimu!',
    illustration: '/assets/illustrations/tutorial-3.png',
  },
];

export default function TutorialModal({ isOpen, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <Modal isOpen={isOpen}>
      {/* Figma: bg #FFF3E7, rounded-[40px], padding 28/76, gap 20, vertical center */}
      <div className="flex flex-col items-center gap-5 bg-[#FFF3E7] rounded-[40px] p-7 -m-6">
        {/* Illustration */}
        <img
          src={stepIllustrations[currentStep]}
          alt={`Tutorial step ${currentStep + 1}`}
          className="w-32 h-32 mx-auto object-contain"
        />

        {/* Text content — Figma: title Inter Tight Medium 20px, desc Inter Tight Regular 14px */}
        <div className="flex flex-col items-center gap-2 w-full">
          <h3 className="font-body font-medium text-xl text-[#1B1B1B] text-center">
            {step.title}
          </h3>
          <p className="font-body text-sm text-[#1B1B1B]/70 text-center">
            {step.description}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep ? 'bg-lime w-4' : 'bg-darkbrown/20'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        {isLastStep ? (
          <Button variant="primary" onClick={onComplete}>
            Ayo Berburu!
          </Button>
        ) : (
          <Button variant="primary" onClick={handleNext}>
            Lanjut
          </Button>
        )}
      </div>
    </Modal>
  );
}
