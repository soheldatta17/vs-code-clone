import React from 'react';
import { Files, Settings, Search, GitBranch, Package, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'explorer' | 'search' | 'git' | 'extensions') => void;
  toggleSidebar: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, toggleSidebar, isOpen }) => {
  const sidebarItems = [
    { id: 'explorer', icon: Files, label: 'Explorer' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'git', icon: GitBranch, label: 'Source Control' },
    { id: 'extensions', icon: Package, label: 'Extensions' }
  ];

  return (
    <div className="w-12 bg-[#333333] h-full flex flex-col items-center">
      <div className="flex flex-col gap-4 py-4">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            className={`p-2 hover:text-white relative group ${
              activeTab === item.id ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => {
              if (activeTab === item.id && isOpen) {
                toggleSidebar();
              } else {
                setActiveTab(item.id as any);
                if (!isOpen) toggleSidebar();
              }
            }}
          >
            <item.icon size={24} />
            {activeTab === item.id && (
              <div className="absolute left-0 w-0.5 h-full bg-[#007acc] top-0" />
            )}
            <div className="hidden group-hover:block absolute left-14 bg-[#252526] text-white px-2 py-1 rounded text-sm whitespace-nowrap">
              {item.label}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-auto pb-4">
        <button className="p-2 text-gray-400 hover:text-white">
          <Settings size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;