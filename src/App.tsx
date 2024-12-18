import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Explorer from './components/Explorer';
import Editor from './components/Editor';
import StatusBar from './components/StatusBar';
import { FileEntry } from './utils/fileSystem';

function App() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [currentFile, setCurrentFile] = useState<FileEntry | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'explorer' | 'search' | 'git' | 'extensions'>('explorer');

  const handleFilesSelected = (newFiles: FileEntry[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleFileSelect = (file: FileEntry) => {
    if (file.type === 'file') {
      setCurrentFile(file);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex relative">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          toggleSidebar={toggleSidebar}
          isOpen={isSidebarOpen}
        />
        {isSidebarOpen && (
          <Explorer 
            files={files} 
            onFileSelect={handleFileSelect}
            onFilesSelected={handleFilesSelected}
            activeTab={activeTab}
          />
        )}
        <Editor currentFile={currentFile} />
      </div>
      <StatusBar />
      <footer className="bg-gray-800 text-white text-center py-2">
        Made with <span className="text-red-500">❤️</span> by Sohel Datta © 2024
      </footer>
    </div>
  );
}

export default App;
