import React, { useState } from 'react';
import Navbar from './components/Navbar';
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTips={() => setIsTipsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInstallHp={() => setIsInstallHpOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-3 sm:py-4">
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

      {/* Modals */}
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
