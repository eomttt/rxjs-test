import React, { useEffect } from 'react';

import { fromEvent, merge } from 'rxjs';
import { switchMap, takeUntil, tap, map, first, startWith, withLatestFrom, share } from 'rxjs/operators';

import * as styles from './styles.css';

const PANEL_COUNT = 4;

export const Carousel8 = () => {

  useEffect(() => {
    const $view = document.getElementById("carousel8");

    const SUPPORT_TOUCH = "ontouchstart" in window;
    const EVENTS = {
        start: SUPPORT_TOUCH ? "touchstart" : "mousedown",
        move: SUPPORT_TOUCH ? "touchmove" : "mousemove",
        end: SUPPORT_TOUCH ? "touchend" : "mouseup"
    };
  
    function toPos(obs$) {
      return obs$.pipe(
        map(v => SUPPORT_TOUCH ? v.changedTouches[0].pageX : v.pageX)
      );
    }
  
    const start$ = fromEvent($view, EVENTS.start).pipe(toPos);
    const move$ = fromEvent($view, EVENTS.move).pipe(toPos);
    const end$ = fromEvent($view, EVENTS.end);
  
    const size$ = fromEvent(window, "resize").pipe(
      startWith(0),
      map(event => $view.clientWidth)
    )
  
    // size$.subscribe(width => console.log("view의 넓이", width));
  
    const drag$ = start$.pipe(
      switchMap(start => move$.pipe(
        map(move => move - start),
        takeUntil(end$)
      )),
      //tap(v => console.log("drag$", v)),
      share()
    )
  
    // drag$.subscribe(distance => console.log("start$와 move$의 차이값", distance));
    // drag는 drag$가 전달하는 start$와 move$의 위치 값의 거리
    const drop$ = drag$.pipe(
      //tap(v => console.log("drop$", v))
      switchMap(drag => end$.pipe(
        map(event => drag),
        first()
      )),
      withLatestFrom(size$)
    );
  
    // drop$.subscribe(array => console.log("drop", array));
  
    const carousel$ = merge(drag$, drop$)
    carousel$.subscribe(v => console.log("캐러셀 데이터", v));
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