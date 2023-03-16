const formatter = Intl.NumberFormat('en', { notation: 'compact' });
export default function formatNumber(n: number) {
  return formatter.format(n);
}
