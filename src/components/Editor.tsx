import React from 'react';
import { FileEntry } from '../utils/fileSystem';

interface EditorProps {
  currentFile: FileEntry | null;
}

const Editor: React.FC<EditorProps> = ({ currentFile }) => {
  if (!currentFile) {
    return (
      <div className="flex-1 bg-[#1e1e1e] text-gray-300 flex items-center justify-center">
        <p className="text-gray-500">Select a file to edit</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#1e1e1e] text-gray-300">
      <div className="flex border-b border-gray-700">
        <div className="px-4 py-2 bg-[#2d2d2d] text-sm border-r border-gray-700">
          {currentFile.name}
        </div>
      </div>
      <div className="p-4 font-mono text-sm overflow-auto h-[calc(100%-2.5rem)]">
        <pre className="whitespace-pre-wrap">
          {currentFile.content}
        </pre>
      </div>
    </div>
  );
};

export default Editor;