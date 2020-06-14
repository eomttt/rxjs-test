import React, { useEffect } from 'react';

import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, tap, map, take, mergeAll, first } from 'rxjs/operators';

import * as styles from './styles.css';

const PANEL_COUNT = 4;

export const Carousel8 = () => {

  useEffect(() => {
    const $view = document.getElementById('carousel8');

    const SUPPORT_TOUCH = 'ontouchstart' in window;
    const EVENTS = {
      start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
      move: SUPPORT_TOUCH ? 'touchmove': 'mousemove',
      end: SUPPORT_TOUCH ? 'touccend' : 'mouseup',
    };

    const toPos = (obs$) => {
      return obs$.pipe(
        map(v => SUPPORT_TOUCH ? v.changedTouches[0].pageX : v.pageX)
      )
    }

    const start$ = fromEvent($view, EVENTS.start).pipe(
      tap(_v => console.log('START')),
      toPos
    );
    const move$ = fromEvent($view, EVENTS.move).pipe(toPos);
    const end$ = fromEvent($view, EVENTS.end).pipe(
      tap(_v => console.log('END'))
    );

    const drag$ = start$.pipe(
      switchMap(start => move$.pipe(
        map(move => move - start),
        takeUntil(end$)
      )),
    );

    const drop$ = drag$.pipe(
      switchMap(drag => end$.pipe(
        first()
      )),
    )

    drag$.subscribe((v => console.log('start$ - move$', v)));
    drop$.subscribe((v => console.log('drop$')))
  }, []);

  return (
    <div id="carousel8" className={styles.view}>
      <ul className={styles.container}>
        <li className={styles.panel}></li>
        <li className={styles.panel}></li>
        <li className={styles.panel}></li>
        <li className={styles.panel}></li>
      </ul>
    </div>
  )
}