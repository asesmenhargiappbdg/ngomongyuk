import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ChatView from './components/ChatView';
import ScenarioView from './components/ScenarioView';
import ListeningGym from './components/ListeningGym';
import TipsModal from './components/TipsModal';
import SettingsModal from './components/SettingsModal';
import InstallHpModal from './components/InstallHpModal';
import { SCENARIOS } from './data/scenarios';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]); // default to cafe
  const [currentSpeed, setCurrentSpeed] = useState(0.85); // friendly slightly slower pace for beginners
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstallHpOpen, setIsInstallHpOpen] = useState(false);

  const handleSelectScenario = (scenario) => {
    setActiveScenario(scenario);
    setActiveTab('chat');
  };

  const handleSpeedToggle = () => {
    // Cycle between 0.7x, 0.85x, 1.0x
    const nextSpeed = currentSpeed === 0.7 ? 0.85 : currentSpeed === 0.85 ? 1.0 : 0.7;
    setCurrentSpeed(nextSpeed);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900/95 sm:py-4 flex justify-center items-center font-sans antialiased text-slate-800">
      {/* Smartphone Device Container */}
      <div className="w-full max-w-md h-screen sm:h-[92vh] sm:max-h-[860px] bg-slate-50 sm:rounded-[36px] sm:shadow-2xl sm:border sm:border-slate-700/60 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <Navbar
          currentSpeed={currentSpeed}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onSpeedToggle={handleSpeedToggle}
        />

        {/* Dynamic Mobile Screen Content */}
        <main className="flex-1 overflow-hidden flex flex-col relative">
          {activeTab === 'chat' && (
            <ChatView
              activeScenario={activeScenario}
              currentSpeed={currentSpeed}
              onOpenTips={() => setIsTipsOpen(true)}
            />
          )}

          {activeTab === 'scenarios' && (
            <ScenarioView onSelectScenario={handleSelectScenario} />
          )}

          {activeTab === 'listening' && (
            <ListeningGym defaultSpeed={currentSpeed} />
          )}
        </main>

        {/* Bottom Mobile Tab Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenTips={() => setIsTipsOpen(true)}
        />
      </div>

      {/* Global Modals */}
      <TipsModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSpeed={currentSpeed}
        onSpeedChange={setCurrentSpeed}
      />

      <InstallHpModal
        isOpen={isInstallHpOpen}
        onClose={() => setIsInstallHpOpen(false)}
      />
    </div>
  );
}
