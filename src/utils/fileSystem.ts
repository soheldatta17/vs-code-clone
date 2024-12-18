export interface FileEntry {
  name: string;
  path: string;
  type: 'file' | 'directory';
  content?: string;
}

export const readFileContent = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

export const processFileList = (files: FileList): Map<string, FileEntry> => {
  const fileMap = new Map<string, FileEntry>();
  
  // First pass: Create all directory entries
  Array.from(files).forEach(file => {
    const pathParts = file.webkitRelativePath.split('/');
    let currentPath = '';
    
    // Create directory entries for each level
    pathParts.slice(0, -1).forEach(part => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      if (!fileMap.has(currentPath)) {
        fileMap.set(currentPath, {
          name: part,
          path: currentPath,
          type: 'directory'
        });
      }
    });
  });
  
  return fileMap;
};