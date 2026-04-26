import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import ProfilingPage from './pages/ProfilingPage';
import LoadingPage from './pages/LoadingPage';
import HomePage from './pages/HomePage';
import ListLevelPage from './pages/ListLevelPage';
import GamePage from './pages/GamePage';
import ComponentPreviewPage from './pages/ComponentPreviewPage';

function App() {
  const onboardingDone = localStorage.getItem('onboarding_done');

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={onboardingDone ? <Navigate to="/loading" replace /> : <OnboardingPage />} 
        />
        <Route path="/profiling" element={<ProfilingPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/mission/:missionId" element={<ListLevelPage />} />
        <Route path="/game/:missionId/:levelId" element={<GamePage />} />
        {import.meta.env.DEV && (
          <Route path="/dev" element={<ComponentPreviewPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
