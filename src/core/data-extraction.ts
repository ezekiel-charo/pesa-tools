import { PDFParse } from 'pdf-parse';
import type { MpesaTransaction } from '../types/mpesa-transaction';
import type { MpesaTransactionType } from '../types/mpesa-transaction-type';
import type { CounterParty } from '../types/counter-party';
import type { StatementData } from '../types/statement-data';

PDFParse.setWorker(
  'https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs'
);

export async function extractStatementData(
  pdfFileData: ArrayBuffer
): Promise<StatementData> {
  const parser = new PDFParse({ data: pdfFileData });
  const tableResult = await parser.getTable();

  const transactions: MpesaTransaction[] = [];
  let counterParties: CounterParty[] = [];

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
          completionTime: Date.parse(row[1]),
          transactionType: getTransactionType(row[2]),
          details: row[2],
          isCharge: row[2].includes('Charge'),
          transactionStatus: row[3],
          paidIn: parseFloat(row[4].replace(/,/g, '')) || null,
          withdrawn: parseFloat(row[5].replace(/,/g, '')) || null,
          balance: parseFloat(row[6].replace(/,/g, '')),
        } as MpesaTransaction;

        transactions.push(txn);

        const counterParty = getCounterparty(txn.details);

        if (counterParty) {
          counterParties.push(counterParty);
        }
      });
    });
  });

  // Get unique counterparties
  counterParties = Array.from(
    new Map(
      counterParties.map((party) => [party.counterPartyNumber, party])
    ).values()
  );

  return { transactions, counterParties };
}

export function getTransactionType(details: string): MpesaTransactionType {
  return 'OTHER'; // TODO: Implement
}

export function getCounterparty(details: string): CounterParty | undefined {
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

export async function processStatements(
  files: FileList
): Promise<StatementData> {
  const transactions: MpesaTransaction[] = [];
  const counterParties: CounterParty[] = [];

  for (const file of files) {
    const fileData = await readFileAsync(file);
    const data = await extractStatementData(fileData);
    transactions.push(...data.transactions);
    counterParties.push(...data.counterParties);
  }

  return { transactions, counterParties };
}
