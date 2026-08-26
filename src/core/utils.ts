export function formatCurreny(value?: number | null): string {
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
