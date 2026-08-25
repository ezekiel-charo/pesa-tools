import { PDFParse } from 'pdf-parse';
import {
  CASH_FLOW_TYPES,
  type CashFlowSummary,
} from '../types/cash-flow-summary';
import type { CounterParty } from '../types/counter-party';
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

        const txn = {
          transactionNo: row[0],
          completionTime: Date.parse(row[1]),
          transactionType: getTransactionType(row[2]),
          details: row[2],
          isCharge: row[2].includes('Charge'),
          transactionStatus: row[3],
          paidIn: parseFloat(row[4].replace(/,/g, '')) || null,
          withdrawn: parseFloat(row[5].replace(/,/g, '')) || null,
          balance: parseFloat(row[6].replace(/,/g, '')),
        } as MpesaTransaction;

        const counterParty = getCounterparty(txn.details);
        txn.counterParty = counterParty;
        txn.counterPartyNumber = counterParty?.counterPartyNumber;

        transactions.push(txn);
      });
    });
  });

  return { transactions, summary };
}

export function getTransactionType(details: string): MpesaTransactionType {
  console.log(details);
  return 'OTHER'; // TODO: Implement
}

export function getCounterparty(details: string): CounterParty | undefined {
  console.log(details);
  return; // TODO: Implement
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
