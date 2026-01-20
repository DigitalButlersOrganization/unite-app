export interface IEvents {
  isEventSelected: boolean;
  IsEventsLoading: boolean;
  data: IEvent[];
}

export interface IEvent {
  eventName: string;
  id: string;
  eventStatus: string;
  order: number;
  progress: number;
  startDate: string;
  timeRemaining: string;
}
