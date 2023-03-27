import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

export default function formatDate(date: number): string {
  const d = new Date(date * 1000);
  const timeStamp = dayjs(dayjs(d)).fromNow();
  return timeStamp;
}
