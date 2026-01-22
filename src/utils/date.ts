/**
 * Форматирует дату в читаемый формат с временем
 * @param dateString - Строка с датой в ISO формате
 * @returns Отформатированная дата в виде "DD.MM.YYYY, HH:MM"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

/**
 * Форматирует дату с названием месяца
 * @param dateString - Строка с датой в ISO формате
 * @returns Отформатированная дата в виде "DD Month YYYY"
 */
export function formatDateWithMonth(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Форматирует количество секунд в формат "Xd Xh Xm"
 * @param seconds - Количество секунд
 * @returns Отформатированная строка времени
 */
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) {
    return '0m';
  }

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }

  return parts.length > 0 ? parts.join(' ') : '0m';
}
