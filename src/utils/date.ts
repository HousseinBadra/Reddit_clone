export default function formatDate(date: number): string {
  const d = new Date(date * 1000);

  const day: number = d.getDay();
  const month: number = d.getMonth();
  const year: number = d.getFullYear();
  return `${day}/${month}/${year}`;
}
