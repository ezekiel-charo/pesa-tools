import { PDFParse } from 'pdf-parse';
import {
  CASH_FLOW_TYPES,
  type CashFlowSummary,
} from '../types/cash-flow-summary';
import type { MpesaTransaction } from '../types/mpesa-transaction';
import type { MpesaTransactionType } from '../types/mpesa-transaction-type';
import type { StatementData } from '../types/statement-data';

PDFParse.setWorker(
  'https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs'
);

export async function extractStatementData(
  pdfFileData: ArrayBuffer,
  password?: string
): Promise<StatementData> {
  const parser = new PDFParse({ data: pdfFileData, password });

  const pdfInfo = await parser.getInfo();
  const pdfSubject = pdfInfo.info['Subject'];
  if (pdfSubject !== 'M-PESA Statement') {
    // Statement validation guard
    throw new Error('Unrecognized mpesa statement', {
      cause: 'unrecognized-statement',
    });
  }

  const tableResult = await parser.getTable();
  const transactions: MpesaTransaction[] = [];
  let summary = {} as CashFlowSummary;

  tableResult.pages.forEach((page, pageIndex) => {
    page.tables.forEach((table, tableIndex) => {
      if (pageIndex === 0 && tableIndex === 0) {
        // Read summary table (first table on the first page)
        summary = Object.fromEntries(
          CASH_FLOW_TYPES.map((t, i) => {
            return [
              t,
              {
                paidIn: parseFloat(table[i + 1][1].replace(/,/g, '')),
                paidOut: parseFloat(table[i + 1][2].replace(/,/g, '')),
              },
            ];
          })
        ) as CashFlowSummary;

        return;
      }

      table.forEach((row, rowIndex) => {
        if (rowIndex === 0) {
          // Skip the table header row
          return;
        }

        const { 0: transactionNo, 2: details, 3: transactionStatus } = row;
        const isCharge = details.includes('Charge');
        const paidIn = parseFloat(row[4].replace(/,/g, ''));
        const amount = paidIn || parseFloat(row[5].replace(/,/g, ''));
        const cashFlowDirection = paidIn ? 'PAID_IN' : 'PAID_OUT';
        const searchableStr = `${transactionNo}${details}`.toLocaleLowerCase();
        const transactionType = getTransactionType(row[2]);

        const txn = {
          transactionNo,
          details,
          isCharge,
          amount,
          cashFlowDirection,
          transactionType,
          searchableStr,
          transactionStatus,
          completionTime: Date.parse(row[1]),
          balance: parseFloat(row[6].replace(/,/g, '')),
        } as MpesaTransaction;

        transactions.push(txn);
      });
    });
  });

  return { transactions, summary };
}

export function getTransactionType(details: string): MpesaTransactionType {
  if (details) return 'OTHER'; // TODO: Implement
  return 'OTHER';
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

export async function processStatement(
  file: File,
  password?: string
): Promise<StatementData> {
  const fileData = await readFileAsync(file);
  return extractStatementData(fileData, password);
}
