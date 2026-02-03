import { MILESTONE_STATUSES } from '@/enums';
import type { IEventStep } from '@/types/event';

export const isDisplayedMainDataBox = (step: IEventStep | undefined): boolean => {
  if (!step) return false;
  if (
    step.status === MILESTONE_STATUSES.COMPLETED ||
    step.status === MILESTONE_STATUSES.REJECTED ||
    step.timeRemaining <= 0 ||
    step.lifeBar <= 0
  ) {
    return false;
  }
  return true;
};
