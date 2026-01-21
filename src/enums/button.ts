import { MILESTONE_STATUSES } from './milestone';

export enum BUTTON_SIZES {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum BUTTON_STYLES {
  SOLID = 'solid',
  OUTLINE = 'outline',
  STRING = 'string',
}

export enum BUTTON_TAGS {
  BUTTON = 'button',
  A = 'a',
  DIV = 'div',
}

export enum BUTTON_TYPES {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export enum BUTTON_BORDERS {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum BUTTON_STATUSES {
  DEFAULT = MILESTONE_STATUSES.DEFAULT,
  ACTIVE = MILESTONE_STATUSES.ACTIVE,
  COMPLETED = MILESTONE_STATUSES.COMPLETED,
  PENDING = MILESTONE_STATUSES.PENDING,
  REJECTED = MILESTONE_STATUSES.REJECTED,
  BASE = MILESTONE_STATUSES.BASE,
  DISABLED = MILESTONE_STATUSES.DISABLED,

  CTA_1 = 'cta-1',
  CTA_2 = 'cta-2',
  CTA_3 = 'cta-3',
}
