import React from 'react';
import { GitBranch, Wifi } from 'lucide-react';

const StatusBar = () => {
  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-2 text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch size={14} />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi size={14} />
          <span>Connected</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span>UTF-8</span>
        <span>TypeScript React</span>
        <span>Spaces: 2</span>
      </div>
    </div>
  );
};

export default StatusBar;