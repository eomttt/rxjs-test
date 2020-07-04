/**
 * subscribeOn은 구독 처리를 어떻게 할 것인가? 에 대한 오퍼레이터이기 때문에 오퍼레이터의 위치에 상관없이 한 번 설정할 수 있다.
 * 반면 observeOn은 데이터 전달을 어떻게 할 것인가?에 대한 오퍼레이터이기 때문에 오퍼레이터의 위치에 영향을 미친다.
 */

import React, { useEffect } from 'react';

import { animationFrameScheduler, interval, concat, of, defer } from 'rxjs';
import { takeWhile, map, tap } from 'rxjs/operators';

// defer에 의해 생성된 Observable이 구독 될 때 start변수의 값이 결정된다.
export const Scheduler10 = () => {
  const animation = (from, to, duration) => {
    return defer(() => {
      const scheduler = animationFrameScheduler;
      const start = scheduler.now();
      const interval$ = interval(0, scheduler)
        .pipe(
          map(() => (scheduler.now() - start) / duration),
          takeWhile(rate => rate < 1),
        );
      
      return concat(interval$, of(1))
        .pipe(
          map(rate => from + (to - from) * rate),
        );
    });
  }

  const animationNotDefer = (from, to, duration) =>{
    const scheduler = animationFrameScheduler;
    const start = scheduler.now();
    const interval$ = interval(0, scheduler)
      .pipe(
        map(() => (scheduler.now() - start) / duration),
        takeWhile(rate => rate < 1),
      );
    
    return concat(interval$, of(1))
      .pipe(
        map(rate => from + (to - from) * rate),
      );
  }

  useEffect(() => {
    const animation$ = animation(100, 500, 300);
    // defer 가 아니면 animationNotDefer 가 call 할 때 start 가 생성되고 구독 할때 scheduler.now() 가 500 이 지난 시점이기 때문에
    // start 가 100 이면 구독 시점에는 scheduler.now() - start 가 600 - 100 이 되므로 무조건 1보다 커져서 1만 나옴
    // 따라서 defer를 통해 구독 될 때 start변수값이 결정되도록 함
    const animationNotDefer$ = animationNotDefer(100, 500, 300);
    setTimeout(() => {
      animation$.subscribe(v => console.log('Animation$', v));
      animationNotDefer$.subscribe(v => console.log('Animation$ Not defer', v));
    }, 500);
  }, []);

  return (
    <div>
      Scheduler10
    </div>
  )
}