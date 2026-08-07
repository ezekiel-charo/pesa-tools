import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useState, type ChangeEvent } from 'react';
import { processStatements } from '../core/pdf';
import SelectedFileList from './SelectedFileList';

export default function Upload() {
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [files, setFiles] = useState<FileList | null>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setBtnDisabled(false);
  };

  const analyseStatements = () => {
    if (!files?.length) return;
    processStatements(files);
  };

  return (
    <>
      <label className="mb-6 cursor-pointer inline-flex flex-col items-center w-120 p-6 rounded-lg border-2 border-dotted border-gray-700 bg-gray-100">
        <CloudArrowUpIcon className="size-12 text-gray-500" />
        <div className="font-medium my-1">
          Click to choose or drag and drop your files
        </div>
        <div className="text-sm text-gray-500">PDF files only</div>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <SelectedFileList files={files} />
      </label>

      <button
        onClick={analyseStatements}
        disabled={btnDisabled}
        className="bg-primary disabled:bg-gray-400 text-white py-2 px-6 rounded-lg font-medium cursor-pointer"
      >
        Analyse
      </button>
    </>
  );
}
