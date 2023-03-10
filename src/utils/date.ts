export default function formatDate(date: number): string {
  const day: number = Math.floor(date / 3600 / 24) % 30;
  const month: number = Math.floor(date / 3600 / 24 / 30) % 12;
  const year: number = Math.floor(date / 3600 / 24 / 365.25) + 1970;
  return `${day}/${month}/${year}`;
}
