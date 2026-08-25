import { ArrowPathIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { processStatements } from '../core/data-extraction';
import { db } from '../core/db';
import SelectedFileList from './SelectedFileList';

export default function Upload() {
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [files, setFiles] = useState<FileList | null>();
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(e.target.files);
      setBtnDisabled(false);
    }
  };

  const analyseStatements = async () => {
    if (!files?.length) return;
    setBtnDisabled(true);

    try {
      const data = await processStatements(files);
      const transactions = data.transactions.map((txn) => {
        delete txn.counterParty;
        return txn;
      });

      db.mpesaTransactions.bulkAdd(transactions);
      db.summary.add({ summary: JSON.stringify(data.summary) });
      navigate('insights');
    } catch (e) {
      setBtnDisabled(false);
      console.error(e);
    }
  };

  return (
    <>
      <label className="mb-6 cursor-pointer inline-flex flex-col items-center mx-3 lg:w-120 p-6 rounded-lg border-2 border-dotted border-gray-700 bg-slate-100">
        <CloudArrowUpIcon className="size-12 text-gray-500" />
        <div className="font-medium my-1 text-center">
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
