'use client';

interface NavigationProps {
  activeTab: 'register' | 'data' | 'dashboard';
  onTabChange: (tab: 'register' | 'data' | 'dashboard') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'register' as const, label: '신규등록', icon: '✏️' },
    { id: 'data' as const, label: '전체데이터', icon: '📋' },
    { id: 'dashboard' as const, label: '대시보드', icon: '📊' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-800">
            경조사 관리
          </h1>

          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
