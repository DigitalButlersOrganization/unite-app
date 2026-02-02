export interface IEvents {
  IsEventsLoading: boolean;
  isTimeRemainingOpen: boolean;
  currentEventId: string | null;
  data: IEvent[];
}

export interface IEvent {
  eventName: string;
  slug: string;
  currentStatus: string | null;
  eventStatus: string;
  order: number;
  progress: number;
  startDate: string;
  createdAt: string;
  timeRemaining: number;
  steps: IEventStep[];
  visaAssistance: IVisaAssistance | null;
  isCurrentMilestoneLoading: boolean;
  isCurrentVisaAssistanceLoading: boolean;
  menu: IEventMenu[];
}

export interface IEventMenu {
  enable: boolean;
  id: string;
  title: string;
  order: number;
  slug: string;
  enableTagNew: boolean;
  showTagNewOverlay: boolean;
}

export interface IEventStep {
  milestone: IMilestone;
  status: string;
  startedAt: string;
  completedAt: string;
  expiredAt: string;
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
  rewards: string;
  files: IMilestoneMainFile[];
}
export interface IVisaAssistance {
  milestone: IVisaAssistanceInner;
  status: string;
  startedAt: string;
  completedAt: string;
  expiredAt: string;
  payment: IMilestonePayment;
}
export interface IVisaAssistanceInner {
  step: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  isBlocked: boolean;
  link: string;
  notes: string;
  order: number;
  rewards: string;
  files: IMilestoneMainFile[];
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
