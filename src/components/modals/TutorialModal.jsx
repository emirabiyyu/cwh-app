import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const STEPS = [
  {
    title: 'Step 1',
    description: 'Tekan layar untuk menyalakan sentermu!',
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
        {/* Illustration placeholder */}
        <div className="w-[88px] h-[88px] rounded-[76px] bg-white flex items-center justify-center overflow-hidden">
          <img
            src={step.illustration}
            alt={step.title}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

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
