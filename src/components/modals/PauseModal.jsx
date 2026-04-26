import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default function PauseModal({ isOpen, onResume, onQuit }) {
  return (
    <Modal isOpen={isOpen}>
      {/* Figma: bg #FFF3E7, rounded-[40px], padding 28/76, gap 20, vertical center */}
      <div className="flex flex-col items-center gap-5 bg-[#FFF3E7] rounded-[40px] p-7 -m-6">
        {/* Pause icon circle — Figma: 88x88 lime circle with pause icon */}
        <div className="w-[88px] h-[88px] rounded-full bg-lime flex items-center justify-center">
          <Icon name="pause" size={40} className="text-darkbrown" />
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-2 w-full">
          <h3 className="font-heading font-bold text-xl text-[#1B1B1B] text-center">
            Game Dijeda
          </h3>
          <p className="font-body text-sm text-[#1B1B1B]/70 text-center">
            Istirahat dulu, lanjut kalau sudah siap ya!
          </p>
        </div>

        {/* Buttons — Figma: horizontal row, gap 8 */}
        <div className="flex items-center gap-2">
          <Button variant="danger" onClick={onQuit}>
            Keluar
          </Button>
          <Button variant="primary" onClick={onResume}>
            Lanjutkan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
