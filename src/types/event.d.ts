export interface IEvents {
  IsEventsLoading: boolean;
  isTimeRemainingOpen: boolean;
  numberOfMilestoneOpenings: number;
  currentEventId: string | null;
  data: IEvent[];
}

export interface IEvent {
  eventName: string;
  slug: string;
  programId: string;
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
  timeRemaining: number;
  lifeBar: number;
  payment: IMilestonePayment | null;
}

export interface IMilestone {
  step: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  // isBlocked: boolean;
  phase: string;

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
  // isBlocked: boolean;
  phase: string;
  link: string;
  notes: string;
  order: number;
  rewards: string;
  files: IMilestoneMainFile[];
}

export interface IMilestonePayment {
  depositAmount: number | null;
  totalAmount: number | null;
  paidAmount: number | null;
  depositPaymentLink: string;
  fullPaymentLink: string;
}
export interface IMilestoneMainFile {
  title: string;
  url: string;
}
