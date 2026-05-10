import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import levelsData from '../data/levels.json';
import CollectionCard from '../components/ui/CollectionCard';
import Icon from '../components/ui/Icon';

export default function KoleksiKataPage() {
  const { missionId } = useParams();
  const navigate = useNavigate();

  const mission = levelsData.find(m => m.id === missionId);

  if (!mission) {
    return <div className="p-8 text-center font-heading text-xl">Mission not found!</div>;
  }

  // Aggregate all unique objects across all levels in this mission
  const allObjectsMap = new Map();
  mission.levels.forEach(level => {
    level.objectsToFind.forEach(obj => {
      if (!allObjectsMap.has(obj.id)) {
        allObjectsMap.set(obj.id, obj);
      }
    });
  });
  const allObjects = Array.from(allObjectsMap.values());

  const isCollected = (objectId) => {
    return localStorage.getItem(`collected_m${missionId}_${objectId}`) === 'true';
  };

  const totalCollected = allObjects.filter(obj => isCollected(obj.id)).length;

  React.useEffect(() => {
    localStorage.setItem(`collection_last_count_m${missionId}`, totalCollected.toString());
  }, [missionId, totalCollected]);

  return (
    <div className="bg-cream min-h-screen flex flex-col relative overflow-hidden animate-fadeIn">
      {/* Container */}
      <div className="w-full max-w-sm mx-auto flex flex-col h-[100dvh] relative z-10">
        
        {/* Header */}
        <div className="flex items-center px-4 py-4 shrink-0">
          <button 
            onClick={() => navigate(`/mission/${missionId}`)}
            className="w-12 h-12 rounded-[1.25rem] bg-white border border-brown/10 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all active:scale-95"
          >
            <Icon name="arrow-left" size={24} className="text-darkbrown fill-current" />
          </button>
          <h1 className="font-heading font-black text-darkbrown text-2xl flex-1 text-center pr-12">
            Koleksi Kata
          </h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-8 scrollbar-hide">
          
          {/* Card info misi */}
          <div className="mx-4 mb-6 bg-white rounded-2xl p-5 shadow-sm border border-brown/5 flex justify-between items-center">
            <div>
              <h2 className="font-heading font-black text-darkbrown text-xl leading-none">{mission.title}</h2>
              <p className="font-body text-sm text-darkbrown/60 mt-1.5 font-medium">
                {mission.levels.length} Level Dimainkan
              </p>
            </div>
            <div className="text-right flex items-baseline gap-1 bg-lime/20 px-3 py-1.5 rounded-xl border border-lime/30">
              <span className="font-heading font-black text-2xl text-lime drop-shadow-sm">
                {totalCollected}
              </span>
              <span className="font-heading font-bold text-sm text-lime/70">
                /{allObjects.length}
              </span>
            </div>
          </div>

          {/* Grid Koleksi */}
          <div className="px-4">
            <h3 className="font-heading font-bold text-sm text-darkbrown/60 uppercase tracking-widest mb-4 px-1">
              Kata dalam Misi ini
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {allObjects.map(obj => (
                <CollectionCard
                  key={obj.id}
                  objectId={obj.id}
                  label={obj.name}
                  imageSrc={obj.image}
                  emoji={obj.emoji}
                  isUnlocked={isCollected(obj.id)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative background */}
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-lime/10 rounded-full blur-3xl pointer-events-none z-0"></div>
    </div>
  );
}
