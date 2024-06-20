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
export interface IFormatCurrencyProps {
  amount: number;
  mantissa?: number;
  average?: boolean; // formats 1000 to 1k
}
export interface IFormatNumberProps {
  number: number;
  mantissa?: number; // e.g 1.1 or 1.12
  average?: boolean; // formats 1000 to 1k
}