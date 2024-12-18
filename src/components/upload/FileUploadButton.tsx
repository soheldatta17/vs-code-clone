import React from 'react';
import { Upload } from 'lucide-react';
import { FileEntry } from '../../utils/fileSystem';
import { useFileUpload } from '../../hooks/useFileUpload';
import UploadProgress from './UploadProgress';

interface FileUploadButtonProps {
  onFilesSelected: (files: FileEntry[]) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFilesSelected }) => {
  const { isUploading, progress, handleFileUpload } = useFileUpload(onFilesSelected);

  return (
    <>
      <button 
        className={`p-1 rounded ${
          isUploading ? 'bg-[#37373d]' : 'hover:bg-[#37373d]'
        }`}
        disabled={isUploading}
      >
        <label className="cursor-pointer flex items-center">
          <Upload size={16} className={isUploading ? 'opacity-50' : ''} />
          <input
            type="file"
            className="hidden"
            multiple
            webkitdirectory="true"
            directory=""
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </button>
      <UploadProgress isUploading={isUploading} progress={progress} />
    </>
  );
};

export default FileUploadButton;