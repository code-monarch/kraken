export interface UseCounterOutput<T> {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: T;
}

export interface IUseBooleanOutputProps<T> {
  value: boolean;
  setValue: T;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}
export interface UseCountdownType {
  seconds: number;
  interval: number;
  isIncrement?: boolean;
}
export interface CountdownOption {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
}
export interface CountdownHelpers {
  start: () => void;
  stop: () => void;
  reset: () => void;
}
export interface CountdownControllers {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}

export interface IUseIntervalProps {
  callback: () => void;
  delay: number | null;
}