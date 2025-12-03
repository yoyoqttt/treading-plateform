import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Watchlist from './components/Watchlist';
import TabNavigation from './components/TabNavigation';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Holdings from './components/Holdings';
import Positions from './components/Positions';
import Funds from './components/Funds';

type TabType = 'dashboard' | 'orders' | 'holdings' | 'positions' | 'funds';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const handleLogin = (email: string, password: string) => {
    // For demo purposes, accept any email/password combination
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setActiveTab('dashboard'); // Reset to dashboard on logout
  };

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} userEmail={userEmail} />;
      case 'orders':
        return <Orders />;
      case 'holdings':
        return <Holdings />;
      case 'positions':
        return <Positions />;
      case 'funds':
        return <Funds />;
      default:
        return <Orders />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 pb-16 h-full">
        {/* Watchlist Sidebar */}
        <div className="w-1/4 min-w-[300px] bg-white border-r border-gray-200 shadow-sm flex-shrink-0">
          <Watchlist />
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 overflow-y-auto h-full">
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;