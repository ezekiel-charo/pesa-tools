import { ArrowPathIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { PasswordException } from 'pdf-parse';
import { useState, type ChangeEvent, type DragEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { processStatement } from '../core/data-extraction';
import { db } from '../core/db';
import type { PasswordErrorCause } from '../types/password-error-cause';
import SelectedFileList from './SelectedFileList';

export default function Upload() {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [files, setFiles] = useState<FileList | null>();
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();

  const handleDragOver: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleFileDrop: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      setFiles(e.dataTransfer.files);
      setBtnDisabled(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(e.target.files);
      setBtnDisabled(false);
    }
  };

  const analyseStatements = async (password?: string) => {
    if (!files?.length) return;
    setBtnDisabled(true);

    try {
      const data = await processStatement(files[0], password);
      db.mpesaTransactions.bulkAdd(data.transactions);
      db.summary.add({ summary: JSON.stringify(data.summary) });
      navigate('insights');
    } catch (error) {
      if ((error as Error).cause === 'unrecognized-statement') {
        alert('The chosen Pdf file might not be a valid Mpesa statement');
      }

      if (error instanceof PasswordException) {
        const cause = error.cause as PasswordErrorCause;
        const promptMessage =
          cause.code === 2
            ? 'PASSWORD INCORRECT, TRY AGAIN. Enter password.'
            : 'The PDF file is password projected. Please enter your password to unlock';
        const password = prompt(promptMessage);
        if (password) {
          analyseStatements(password); // Retry with password
          return;
        }
      }

      setBtnDisabled(false);
      console.error(error);
    }
  };

  return (
    <>
      <label
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
        className={
          (isDragging || files?.length ? 'border-orange-800' : '') +
          ' mb-6 cursor-pointer inline-flex flex-col items-center mx-3 lg:w-120 p-6 rounded-lg border-2 border-dotted border-gray-700 bg-slate-100'
        }
      >
        <CloudArrowUpIcon className="size-12 text-gray-500" />
        <div className="font-medium my-1 text-center">
          Click to choose or drag and drop your files
        </div>
        <div className="text-sm text-gray-500">PDF files only</div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <SelectedFileList files={files} />
      </label>

      <button
        onClick={() => analyseStatements()}
        disabled={btnDisabled}
        className="flex items-center bg-primary disabled:bg-gray-400 text-white py-2 px-6 rounded-lg font-medium cursor-pointer"
      >
        {files && btnDisabled ? (
          <>
            <ArrowPathIcon className="size-4 animate-spin me-1" />
            Processing...
          </>
        ) : (
          `Let's Go`
        )}
      </button>
    </>
  );
}
