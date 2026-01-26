import type { IEvent } from '@/types/event';

export const getCurrentProgressForTimeRemaining: (eventData: IEvent) => number = (
  eventData: IEvent,
) => {
  // Преобразуем даты в миллисекунды
  const createdAtMs = new Date(eventData.createdAt).getTime();
  const startDateMs = new Date(eventData.startDate).getTime();
  // Конвертируем секунды в миллисекунды
  const timeRemainingMs = eventData.timeRemaining * 1000;

  // Полная длительность от создания до начала события
  const totalDurationMs = startDateMs - createdAtMs;

  // Процент оставшегося времени (от 100% до 0%)
  const remainingPercentage = (timeRemainingMs / totalDurationMs) * 100;

  // Ограничиваем значение от 0 до 100
  return Math.max(0, Math.min(100, remainingPercentage));
};
