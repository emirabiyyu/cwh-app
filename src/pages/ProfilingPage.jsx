import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import AvatarPicker from '../components/ui/AvatarPicker';

export default function ProfilingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi input
    if (!name.trim()) {
      setError('Masukkan nama kamu dulu ya!');
      return;
    }
    if (!selectedAvatar) {
      setError('Pilih avatarmu terlebih dahulu!');
      return;
    }

    // Simpan data
    localStorage.setItem('player_name', name.trim());
    localStorage.setItem('player_avatar', selectedAvatar);
    
    // Pindah ke Loading page
    navigate('/loading');
  };

  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-6 sm:p-8 animate-fadeIn">
      {/* Decorative Ornaments (optional) */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-lime/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#5AC8FA]/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="w-full max-w-sm bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-brown/5 z-10">
        
        <h1 className="font-heading text-3xl text-darkbrown font-bold text-center mb-6">
          Buat Profilmu
        </h1>

        {error && (
          <div className="font-body text-sm font-medium text-white bg-[#FF3B30] rounded-xl px-4 py-3 mb-6 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-3">
            <label className="font-body text-darkbrown text-sm font-bold tracking-wide uppercase opacity-80">
              Pilih Avatar
            </label>
            <AvatarPicker 
              selectedAvatar={selectedAvatar} 
              onSelect={(id) => {
                setSelectedAvatar(id);
                setError('');
              }} 
            />
          </div>

          <div className="flex flex-col gap-3 mb-2">
            <label htmlFor="name" className="font-body text-darkbrown text-sm font-bold tracking-wide uppercase opacity-80">
              Nama Kamu
            </label>
            <input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Ketik namamu..."
              className="font-body text-base xl:text-lg px-5 py-4 rounded-xl border-2 border-cream bg-[#FAFAFA] text-darkbrown placeholder:text-brown/40 focus:outline-none focus:border-lime focus:bg-white focus:shadow-[0_0_0_4px_rgba(185,190,26,0.1)] transition-all font-semibold"
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            className="text-lg py-4"
          >
            Lanjut Bermain
          </Button>

        </form>
      </div>
    </div>
  );
}
