import { Observable } from 'rxjs';

export type WySliderStyle = {
  width?: number | string | null;
  height?: number | string | null;
  left?: number | string | null;
  bottom?: number | string | null;
};

export type SliderEventObserverConfig = {
  start: string;
  move: string;
  end: string;
  filterFunc: (e: Event) => boolean;
  pluckKey: string[];
  startPlucked$?: Observable<number>;
  moveResolved$?: Observable<number>;
  end$?: Observable<Event>;
};

export type SliderValue = number | null;
