import React, { useRef, useEffect } from 'react';
import { Player } from '@lordicon/react';

// Make sure the paths to your icon JSON files are correct
import dashboardIcon from '../assets/icons/dashboard-icon.json';
import ordersIcon from '../assets/icons/orders-icon.json';
import holdingsIcon from '../assets/icons/holdings-icon.json';
import positionsIcon from '../assets/icons/positions-icon.json';
import fundsIcon from '../assets/icons/funds-icon.json';

type TabType = 'dashboard' | 'orders' | 'holdings' | 'positions' | 'funds';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
  { id: 'orders', label: 'Orders', icon: ordersIcon },
  { id: 'holdings', label: 'Holdings', icon: holdingsIcon },
  { id: 'positions', label: 'Positions', icon: positionsIcon },
  { id: 'funds', label: 'Funds', icon: fundsIcon },
] as const;

// CORRECTED: This version fixes the TypeError
const AnimatedIcon = ({ icon, isActive }: { icon: any; isActive: boolean }) => {
  const playerRef = useRef<Player>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (playerRef.current) {
      if (isActive) {
        playerRef.current.playFromBeginning();
      } else {
        // FIX: The 'goToAndStop' method is on the 'animation' property.
        playerRef.current.animation?.goToAndStop(0, true);
      }
    }
  }, [isActive]);

  return (
    <Player
      ref={playerRef}
      icon={icon}
      size={28}
      colorize={isActive ? '#007bff' : '#6c757d'}
      onReady={() => playerRef.current?.playFromBeginning()}
    />
  );
};

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as TabType)}
              className={`relative flex flex-col items-center justify-center px-3 py-2 transition-colors flex-1 ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
              )}
              <AnimatedIcon icon={tab.icon} isActive={isActive} />
              <span className={`text-xs font-medium ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;