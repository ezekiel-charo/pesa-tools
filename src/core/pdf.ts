import { PDFParse } from 'pdf-parse';
import type { MpesaTransaction } from '../types/mpesa-transaction';

PDFParse.setWorker(
  'https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs'
);

export async function extractTransactions(
  pdfFileData: ArrayBuffer
): Promise<MpesaTransaction[]> {
  const transactions: MpesaTransaction[] = [];
  const parser = new PDFParse({ data: pdfFileData });
  const tableResult = await parser.getTable();

  tableResult.pages.forEach((page, pageIndex) => {
    page.tables.forEach((table, tableIndex) => {
      if (pageIndex === 0 && tableIndex === 0) {
        // Skip the summary table (first table on the first page)
        return;
      }

      table.forEach((row, rowIndex) => {
        if (rowIndex === 0) {
          // Skip the table header row
          return;
        }

        const txn = {
          transactionNo: row[0],
          completionTime: row[1],
          details: row[2],
          transactionStatus: row[3],
          paidIn: parseFloat(row[4].replace(/,/g, '')) || null,
          withdrawn: parseFloat(row[5].replace(/,/g, '')) || null,
          balance: parseFloat(row[6].replace(/,/g, '')),
        } as MpesaTransaction;
        transactions.push(txn);
      });
    });
  });

  return transactions;
}

export function readFileAsync(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsArrayBuffer(file);
  });
}

export async function processStatements(
  files: FileList
): Promise<MpesaTransaction[]> {
  const transactions: MpesaTransaction[] = [];

  for (const file of files) {
    const fileData = await readFileAsync(file);
    const txns = await extractTransactions(fileData);
    transactions.push(...txns);
  }

  return transactions;
}
