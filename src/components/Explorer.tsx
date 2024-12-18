import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder } from 'lucide-react';
import { FileEntry } from '../utils/fileSystem';
import FileUploadButton from './upload/FileUploadButton';

interface ExplorerProps {
  files: FileEntry[];
  onFileSelect: (file: FileEntry) => void;
  onFilesSelected: (files: FileEntry[]) => void;
  activeTab: string;
}

const Explorer: React.FC<ExplorerProps> = ({ files, onFileSelect, onFilesSelected, activeTab }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getChildFiles = (parentPath: string) => {
    return files.filter(file => {
      const relativePath = file.path.replace(parentPath + '/', '');
      return file.path.startsWith(parentPath + '/') && !relativePath.includes('/');
    });
  };

  const getRootFiles = () => {
    return files.filter(file => !file.path.includes('/') || file.path.split('/').length === 1);
  };

  const renderFileTree = (fileList: FileEntry[], level = 0) => {
    return fileList.map((file) => (
      <div key={file.path}>
        <div
          className="flex items-center gap-1 hover:bg-[#37373d] p-1 cursor-pointer group"
          style={{ paddingLeft: `${level * 12}px` }}
          onClick={() => file.type === 'directory' ? toggleFolder(file.path) : onFileSelect(file)}
        >
          {file.type === 'directory' ? (
            <>
              {expandedFolders.has(file.path) ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <Folder size={16} className="text-blue-400" />
            </>
          ) : (
            <FileText size={16} className="text-gray-400" />
          )}
          <span className="text-sm">{file.name}</span>
        </div>
        {file.type === 'directory' && expandedFolders.has(file.path) && (
          <div className="ml-2">
            {renderFileTree(getChildFiles(file.path), level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'explorer':
        return (
          <>
            <div className="p-2 text-sm font-semibold border-b border-gray-700 flex justify-between items-center">
              EXPLORER
              <FileUploadButton onFilesSelected={onFilesSelected} />
            </div>
            <div className="p-2">{renderFileTree(getRootFiles())}</div>
          </>
        );
      case 'search':
        return (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Search files..."
                className="w-full bg-[#3c3c3c] text-white px-3 py-1 rounded border border-[#007acc] focus:outline-none"
              />
            </div>
          </div>
        );
      case 'git':
        return (
          <div className="p-4">
            <div className="text-sm">Source Control features coming soon...</div>
          </div>
        );
      case 'extensions':
        return (
          <div className="p-4">
            <div className="text-sm">Extensions marketplace coming soon...</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-60 bg-[#252526] h-full text-gray-300 overflow-y-auto flex flex-col">
      {renderTabContent()}
    </div>
  );
};

export default Explorer;