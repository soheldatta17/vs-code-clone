import { useState, useCallback } from 'react';
import { FileEntry, readFileContent, processFileList } from '../utils/fileSystem';

interface UseFileUploadReturn {
  isUploading: boolean;
  progress: number;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const useFileUpload = (
  onFilesSelected: (files: FileEntry[]) => void
): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setProgress(0);
    
    // Process directories first
    const fileMap = processFileList(files);
    const totalFiles = files.length;

    // Process files
    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const content = await readFileContent(file);
      
      fileMap.set(file.webkitRelativePath, {
        name: file.name,
        path: file.webkitRelativePath,
        type: 'file',
        content
      });

      setProgress(((i + 1) / totalFiles) * 100);
    }
    
    // Convert map to array and sort by path
    const fileEntries = Array.from(fileMap.values())
      .sort((a, b) => a.path.localeCompare(b.path));
    
    onFilesSelected(fileEntries);
    
    // Reset after a short delay to show 100%
    setTimeout(() => {
      setIsUploading(false);
      setProgress(0);
    }, 500);
  }, [onFilesSelected]);

  return {
    isUploading,
    progress,
    handleFileUpload
  };
};