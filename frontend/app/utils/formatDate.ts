const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date ("2026-10-01") as "01.10.2026". */
export function formatDate(isoDate: string): string {
  return dateFormat.format(new Date(isoDate));
}

const sizeFormat = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

/** Formats a byte count as "350 KB" or "1,2 MB". */
export function formatFileSize(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${sizeFormat.format(Math.max(1, Math.round(bytes / 1024)))}\u00a0KB`
    : `${sizeFormat.format(bytes / (1024 * 1024))}\u00a0MB`;
}
