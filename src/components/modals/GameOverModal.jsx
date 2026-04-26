import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default function GameOverModal({ isOpen, onHome, onRetry }) {
  return (
    <Modal isOpen={isOpen}>
      {/* Figma: bg #FFF3E7, rounded-[40px], padding ~28/76, gap ~20, vertical center */}
      <div className="flex flex-col items-center gap-5 bg-[#FFF3E7] rounded-[40px] p-7 -m-6">
        {/* 4 lost hearts */}
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((i) => (
            <Icon key={i} name="heart-lost" size={32} className="text-white fill-current opacity-60" />
          ))}
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-2 w-full">
          <h3 className="font-heading font-bold text-xl text-[#1B1B1B] text-center">
            Yaah, nyawamu habis :(
          </h3>
          <p className="font-body text-sm text-[#1B1B1B]/70 text-center">
            Kamu sudah berusaha keras kok! Coba lagi, pasti bisa!
          </p>
        </div>

        {/* Buttons — Figma: secondary (Ke Beranda) + primary (Coba Lagi) */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onHome}>
            Ke Beranda
          </Button>
          <Button variant="primary" onClick={onRetry}>
            Coba Lagi
          </Button>
        </div>
      </div>
    </Modal>
  );
}
