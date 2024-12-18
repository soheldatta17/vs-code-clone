import React from 'react';
import { Loader2 } from 'lucide-react';

interface UploadProgressProps {
  progress: number;
  isUploading: boolean;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress, isUploading }) => {
  if (!isUploading) return null;

  return (
    <div className="fixed bottom-8 right-8 bg-[#252526] border border-[#007acc] rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center gap-3">
        <Loader2 className="animate-spin" size={20} />
        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-300">Uploading files...</div>
          <div className="w-48 h-1.5 bg-[#3c3c3c] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#007acc] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 text-right">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;