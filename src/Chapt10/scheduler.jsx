import React, { useEffect } from 'react';

import { animationFrameScheduler, interval, concat, of } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

export const Scheduler10 = () => {
  useEffect(() => {
    const scheduler = animationFrameScheduler;
    const start = scheduler.now();
    const DURATION = 300;
    const interval$ = interval(0, scheduler)
      .pipe(
        map(() => (scheduler.now() - start) / DURATION),
        takeWhile(rate => rate < 1),
      );
    
    const animation$ = concat(interval$, of(1));
    
    animation$.subscribe(rate => console.log('Animation$', rate));
  }, []);

  return (
    <div>
      Scheduler10
    </div>
  )
}