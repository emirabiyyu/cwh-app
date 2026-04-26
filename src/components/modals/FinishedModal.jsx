import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import StarDisplay from '../ui/StarDisplay';

function getSubtext(stars) {
  if (stars === 3) return 'Perfect! You got all the stars!';
  if (stars === 2) return 'Great job! Almost perfect!';
  if (stars === 1) return 'Good try! You can do better!';
  return 'Try again to earn some stars!';
}

export default function FinishedModal({ isOpen, stars = 0, onHome, onNext, onRetry, isLastLevel = false }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col items-center gap-5 bg-[#FFF3E7] rounded-[40px] p-7 -m-6">
        <StarDisplay count={stars} size="lg" animated />

        <div className="flex flex-col items-center gap-2 w-full">
          <h3 className="font-heading font-bold text-xl text-[#1B1B1B] text-center">
            Woohoo!
          </h3>
          <p className="font-body text-sm text-[#1B1B1B]/70 text-center">
            {getSubtext(stars)}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onHome}>
            Ke Beranda
          </Button>
          <Button 
            variant="primary" 
            onClick={isLastLevel ? undefined : onNext}
            disabled={isLastLevel}
            className={isLastLevel ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isLastLevel ? 'Level Terakhir' : 'Lanjut'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
