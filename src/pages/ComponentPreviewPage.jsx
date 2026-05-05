import React from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import StarDisplay from '../components/ui/StarDisplay';
import HudBar from '../components/game/HudBar';
import InstructionBar from '../components/game/InstructionBar';
import ObjectCard from '../components/game/ObjectCard';
import ObjectGrid from '../components/game/ObjectGrid';
import Toast from '../components/ui/Toast';
import TutorialModal from '../components/modals/TutorialModal';
import PauseModal from '../components/modals/PauseModal';
import FinishedModal from '../components/modals/FinishedModal';
import GameOverModal from '../components/modals/GameOverModal';
import MissionCard from '../components/ui/MissionCard';
import LevelCard from '../components/ui/LevelCard';
import AvatarPicker from '../components/ui/AvatarPicker';
import CollectionCard from '../components/ui/CollectionCard';

export default function ComponentPreviewPage() {
  return (
    <div className="bg-cream min-h-screen p-8 text-darkbrown font-body">
      <div className="max-w-lg mx-auto space-y-12 pb-20">
        
        {/* Header Preview */}
        <div>
          <h1 className="font-heading text-3xl font-bold border-b-2 border-darkbrown/20 pb-2 mb-4">
            Component Preview
          </h1>
          <p className="text-sm text-darkbrown/60">
            🛠 Preview semua versi UI components di sini. Halaman ini hanya bisa diakses via /dev.
          </p>
        </div>

        {/* Buttons Section */}
        <section>
          <h2 className="font-heading text-xl font-bold border-b border-darkbrown/10 pb-2 mb-4">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-darkbrown/60">Primary</span>
              <Button variant="primary">Ayo Mulai!</Button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-darkbrown/60">Secondary</span>
              <Button variant="secondary">Ke Beranda</Button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-darkbrown/60">Danger</span>
              <Button variant="danger">Keluar</Button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-darkbrown/60">Disabled</span>
              <Button variant="disabled">Tidak Aktif</Button>
            </div>
            <div className="flex flex-col items-start gap-2 w-full mt-4">
              <span className="text-xs text-darkbrown/60">Full Width Primary</span>
              <Button variant="primary" fullWidth>Full Width</Button>
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section>
          <h2 className="font-heading text-xl font-bold border-b border-darkbrown/10 pb-2 mb-4">
            Icons
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'heart-active', color: 'text-[#FF3B30]' },
              { name: 'heart-lost', color: 'text-gray-400' },
              { name: 'star-active', color: 'text-yellow-400' },
              { name: 'star-inactive', color: 'text-gray-300' },
              { name: 'pause', color: 'text-lime' },
              { name: 'play', color: 'text-lime' },
              { name: 'lock', color: 'text-darkbrown/60' },
              { name: 'arrow-left', color: 'text-darkbrown' },
              { name: 'check', color: 'text-green-500' },
              { name: 'x-mark', color: 'text-[#FF3B30]' }
            ].map((icon) => (
              <div key={icon.name} className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-xl border border-darkbrown/5 shadow-sm">
                <Icon name={icon.name} size={32} className={`${icon.color} fill-current`} />
                <span className="text-xs text-darkbrown/60 font-mono">{icon.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="font-heading text-xl font-bold border-b border-darkbrown/10 pb-2 mb-4">
            Cards
          </h2>
          <span className="text-xs text-darkbrown/60 block mb-3">ObjectCard (default, selected, correct, wrong)</span>
          <div className="grid grid-cols-4 gap-3">
            <ObjectCard id="obj-1" label="Blue Pencil" imageSrc="/assets/placeholder.png" state="default" />
            <ObjectCard id="obj-2" label="Red Apple" imageSrc="/assets/placeholder.png" state="selected" />
            <ObjectCard id="obj-3" label="Green Ball" imageSrc="/assets/placeholder.png" state="correct" />
            <ObjectCard id="obj-4" label="Yellow Star" imageSrc="/assets/placeholder.png" state="wrong" />
          </div>

          <span className="text-xs text-darkbrown/60 block mb-3 mt-6">MissionCard (active + locked)</span>
          <div className="flex flex-col gap-4">
            <MissionCard
              missionName="Modul 1: Colors"
              levelCount={3}
              earnedStars={5}
              isLocked={false}
              onStart={() => alert('Start!')}
            />
            <MissionCard
              missionName="Modul 2: Animals"
              levelCount={4}
              requiredStars={9}
              earnedStars={0}
              isLocked={true}
            />
          </div>

          <span className="text-xs text-darkbrown/60 block mb-3 mt-6">LevelCard (available 0★, available 3★, locked)</span>
          <div className="grid grid-cols-3 gap-3">
            <LevelCard levelNumber={1} earnedStars={0} onClick={() => alert('Level 1')} />
            <LevelCard levelNumber={2} earnedStars={3} onClick={() => alert('Level 2')} />
            <LevelCard levelNumber={3} isLocked />
          </div>

          <span className="text-xs text-darkbrown/60 block mb-3 mt-6">CollectionCard (unlocked, locked)</span>
          <div className="grid grid-cols-4 gap-3">
            <CollectionCard label="Sofa" emoji="🛋️" imageSrc="" isUnlocked={true} />
            <CollectionCard label="Lamp" emoji="💡" imageSrc="" isUnlocked={false} />
          </div>
        </section>

        {/* ObjectGrid Section */}
        <section>
          <h2 className="font-heading text-xl font-bold border-b border-darkbrown/10 pb-2 mb-4">
            Object Grid
          </h2>
          <span className="text-xs text-darkbrown/60 block mb-3">ObjectGrid — 8 objects, mixed states</span>
          <div className="bg-darkbrown/5 p-4 rounded-xl">
            <ObjectGrid
              objects={[
                { id: 'g1', label: 'Blue Pencil', imageSrc: '/assets/placeholder.png' },
                { id: 'g2', label: 'Red Apple', imageSrc: '/assets/placeholder.png' },
                { id: 'g3', label: 'Green Ball', imageSrc: '/assets/placeholder.png' },
                { id: 'g4', label: 'Yellow Star', imageSrc: '/assets/placeholder.png' },
                { id: 'g5', label: 'Orange Cat', imageSrc: '/assets/placeholder.png' },
                { id: 'g6', label: 'Pink Flower', imageSrc: '/assets/placeholder.png' },
                { id: 'g7', label: 'Purple Hat', imageSrc: '/assets/placeholder.png' },
                { id: 'g8', label: 'Brown Dog', imageSrc: '/assets/placeholder.png' },
              ]}
              cardStates={{
                g2: 'selected',
                g4: 'correct',
                g6: 'wrong',
              }}
              onCardRef={(id, el) => {}}
            />
          </div>
        </section>

        {/* Game Components Section */}
        <section>
          <h2 className="font-heading text-xl font-bold border-b border-darkbrown/10 pb-2 mb-4">
            Game Components
          </h2>
          <div className="flex flex-col gap-6 w-full bg-white/30 rounded-xl p-4 border border-darkbrown/10">
            <div className="w-full">
              <span className="text-xs text-darkbrown/60 block mb-2">HudBar (lives=4)</span>
              <div className="bg-cream/50 rounded-xl border border-darkbrown/5">
                <HudBar levelLabel="Level 1" lives={4} onPause={() => alert('Paused!')} />
              </div>
            </div>
            <div className="w-full">
              <span className="text-xs text-darkbrown/60 block mb-2">HudBar (lives=2)</span>
              <div className="bg-cream/50 rounded-xl border border-darkbrown/5">
                <HudBar levelLabel="Level 20" lives={2} onPause={() => alert('Paused!')} />
              </div>
            </div>
            <div className="w-full">
              <span className="text-xs text-darkbrown/60 block mb-2">HudBar (lives=1)</span>
              <div className="bg-cream/50 rounded-xl border border-darkbrown/5">
                <HudBar levelLabel="Level 25" lives={1} onPause={() => alert('Paused!')} />
              </div>
            </div>
            <div className="w-full">
              <span className="text-xs text-darkbrown/60 block mb-2">HudBar (lives=0)</span>
              <div className="bg-cream/50 rounded-xl border border-darkbrown/5">
                <HudBar levelLabel="Level 35" lives={0} onPause={() => alert('Paused!')} />
              </div>
            </div>
            
            <div className="w-full mt-4">
              <span className="text-xs text-darkbrown/60 block mb-2">InstructionBar (timer=100, 50, 15)</span>
              <div className="flex flex-col gap-4 bg-darkbrown/5 p-4 rounded-xl">
                <InstructionBar instructionText="Find Blue Pencil!" timerPercent={100} />
                <InstructionBar instructionText="Find Round Objects!" timerPercent={50} />
                <InstructionBar instructionText="Hurry! Find the Red Apple!" timerPercent={15} />
              </div>
            </div>
            
          </div>
        </section>

        {/* Modals Section */}
        <section>
          <h2 className="font-heading text-xl font-bold border-b border-darkbrown/10 pb-2 mb-4">
            Modals
          </h2>
          <span className="text-xs text-darkbrown/60 block mb-3">TutorialModal (isOpen=true)</span>
          <div className="relative min-h-[400px] w-full bg-darkbrown/5 rounded-xl border border-darkbrown/10 overflow-hidden">
            <TutorialModal isOpen={true} onComplete={() => alert('Tutorial complete!')} />
          </div>

          <span className="text-xs text-darkbrown/60 block mb-3 mt-6">PauseModal (isOpen=true)</span>
          <div className="relative min-h-[300px] w-full bg-darkbrown/5 rounded-xl border border-darkbrown/10 overflow-hidden">
            <PauseModal isOpen={true} onResume={() => alert('Resumed!')} onQuit={() => alert('Quit!')} />
          </div>

          <span className="text-xs text-darkbrown/60 block mb-3 mt-6">FinishedModal (stars=1, 2, 3)</span>
          <div className="flex flex-col gap-6">
            <div className="relative min-h-[300px] w-full bg-darkbrown/5 rounded-xl border border-darkbrown/10 overflow-hidden">
              <FinishedModal isOpen={true} stars={1} onHome={() => alert('Home')} onNext={() => alert('Next')} />
            </div>
            <div className="relative min-h-[300px] w-full bg-darkbrown/5 rounded-xl border border-darkbrown/10 overflow-hidden">
              <FinishedModal isOpen={true} stars={2} onHome={() => alert('Home')} onNext={() => alert('Next')} />
            </div>
            <div className="relative min-h-[300px] w-full bg-darkbrown/5 rounded-xl border border-darkbrown/10 overflow-hidden">
              <FinishedModal isOpen={true} stars={3} onHome={() => alert('Home')} onNext={() => alert('Next')} isLastLevel />
            </div>
          </div>

          <span className="text-xs text-darkbrown/60 block mb-3 mt-6">GameOverModal (isOpen=true)</span>
          <div className="relative min-h-[300px] w-full bg-darkbrown/5 rounded-xl border border-darkbrown/10 overflow-hidden">
            <GameOverModal isOpen={true} onHome={() => alert('Home')} onRetry={() => alert('Retry')} />
          </div>
        </section>

        {/* Toast Section */}
        <section>
          <h2 className="font-heading text-xl font-bold border-b border-darkbrown/10 pb-2 mb-4">
            Toast
          </h2>
          <span className="text-xs text-darkbrown/60 block mb-3">3 types: correct, wrong, timer (visible=true)</span>
          <div className="flex flex-col gap-6 items-center">
            {/* Using relative containers so the absolute-positioned toasts render inline */}
            <div className="relative w-full h-14 bg-darkbrown/5 rounded-xl">
              <Toast message="Correct answer!" type="correct" visible={true} />
            </div>
            <div className="relative w-full h-14 bg-darkbrown/5 rounded-xl">
              <Toast message="Wrong answer" type="wrong" visible={true} />
            </div>
            <div className="relative w-full h-14 bg-darkbrown/5 rounded-xl">
              <Toast message="Time is up!" type="timer" visible={true} />
            </div>
          </div>
        </section>

        {/* Avatar & Stars Section */}
        <section>
          <h2 className="font-heading text-xl font-bold border-b border-darkbrown/10 pb-2 mb-4">
            Avatar & Stars
          </h2>
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex flex-col items-start gap-2 w-full">
              <span className="text-xs text-darkbrown/60">AvatarPicker (selected="avatar_3")</span>
              <div className="w-full bg-darkbrown/5 p-4 rounded-xl">
                <AvatarPicker selectedAvatar="avatar_3" onSelect={(id) => alert(`Selected Avatar: ${id}`)} />
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="text-xs text-darkbrown/60">Stars (count 0-3 + animated)</span>
              <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col items-center gap-1 bg-white/50 p-2 rounded-xl border border-darkbrown/5">
                  <StarDisplay count={0} size="md" />
                  <span className="text-[10px] text-darkbrown/40">count=0</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/50 p-2 rounded-xl border border-darkbrown/5">
                  <StarDisplay count={1} size="md" />
                  <span className="text-[10px] text-darkbrown/40">count=1</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/50 p-2 rounded-xl border border-darkbrown/5">
                  <StarDisplay count={2} size="md" />
                  <span className="text-[10px] text-darkbrown/40">count=2</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/50 p-2 rounded-xl border border-darkbrown/5">
                  <StarDisplay count={3} size="md" />
                  <span className="text-[10px] text-darkbrown/40">count=3</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-lime/20 p-2 rounded-xl border border-brand-lime">
                  <StarDisplay count={3} size="md" animated />
                  <span className="text-[10px] text-darkbrown/40">animated!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
