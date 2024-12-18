import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { FileEntry, readFileContent } from '../utils/fileSystem';

interface FileUploadProps {
  onFilesSelected: (files: FileEntry[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileEntries: FileEntry[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = await readFileContent(file);
      
      fileEntries.push({
        name: file.name,
        path: file.webkitRelativePath || file.name,
        type: 'file',
        content
      });
    }
    
    onFilesSelected(fileEntries);
  }, [onFilesSelected]);

  return (
    <button className="p-1 hover:bg-[#37373d] rounded">
      <label className="cursor-pointer flex items-center">
        <Upload size={16} />
        <input
          type="file"
          className="hidden"
          multiple
          webkitdirectory="true"
          directory=""
          onChange={handleFileUpload}
        />
      </label>
    </button>
  );
};

export default FileUpload;