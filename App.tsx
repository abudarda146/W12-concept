import React, { useState } from 'react';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black selection:bg-cyan-500/30">
      {/* Lock Screen Layer */}
      {isLocked && (
        <LockScreen onUnlock={() => setIsLocked(false)} />
      )}

      {/* Desktop Environment Layer */}
      <Desktop />
      
    </div>
  );
};

export default App;
