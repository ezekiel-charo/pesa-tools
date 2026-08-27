import * as ExcelJS from 'exceljs';
import type { MpesaTransaction } from '../types/mpesa-transaction';

export function formatNumber(value?: number | null): string {
  if (!value && value !== 0) return '';
  return new Intl.NumberFormat().format(Math.abs(value));
}

export function copyToClipboard(text: string): void {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(`Text copied to clipboard: ${text}`);
    })
    .catch(() => {
      console.error('Failed to copy text:', text);
    });
}

export async function exportToXlsx(transactions: MpesaTransaction[]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Transactions');
  worksheet.columns = [
    { header: 'Transaction No.', key: 'transactionNo', width: 16 },
    {
      header: 'Completion Time',
      key: 'completionTime',
      width: 32,
    },
    { header: 'PAID_IN/PAID_OUT', key: 'cashFlowDirection', width: 8 },
    { header: 'Amount', key: 'amount', width: 16 },
    { header: 'Balance', key: 'balance', width: 12 },
    { header: 'Details', key: 'details', width: 64 },
  ];
  worksheet.addRows(transactions);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Trigger the browser download
  const fileName = 'Mpesa-statement.xlsx';
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();

  // Clean up the URL object
  window.URL.revokeObjectURL(url);
}
