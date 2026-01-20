export interface IEvents {
  isEventSelected: boolean;
  IsEventsLoading: boolean;
  data: IEvent[];
}

export interface IEvent {
  eventName: string;
  id: string;
  currentStatus: string | null;
  eventStatus: string;
  order: number;
  progress: number;
  startDate: string;
  timeRemaining: string;
  steps: IEventStep[];
}

export interface IEventStep {
  milestone: IMilestone;
  status: string;
  startedAt: string;
  completedAt: string;
  expiredAt: string;
  files: IMilestoneMainFile[];
  payment: IMilestonePayment;
}

export interface IMilestone {
  step: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  isBlocked: boolean;
  link: string;
  notes: string;
  order: number;
  files: IMilestoneSecondaryFile[];
}

export interface IMilestonePayment {
  depositAmount: number;
  totalAmount: number;
  paidAmount: number;
  depositEndDate: string;
  totalEndDate: string;
}

export interface IMilestoneMainFile {
  title: string;
  url: string;
}
export interface IMilestoneSecondaryFile {
  title: string;
  url: string;
}
