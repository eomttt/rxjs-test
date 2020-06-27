import React, { useEffect, useState } from 'react';

import { fromEvent, merge } from 'rxjs';
import { switchMap, takeUntil, map, first, startWith, withLatestFrom, share, scan } from 'rxjs/operators';

import * as styles from '../Chapt8/styles.css';

const PANEL_COUNT = 4;
const THRESHOLD = 30;

export const Carousel9 = () => {
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    const $view = document.getElementById("carousel9");

    const SUPPORT_TOUCH = "ontouchstart" in window;
    const EVENTS = {
        start: SUPPORT_TOUCH ? "touchstart" : "mousedown",
        move: SUPPORT_TOUCH ? "touchmove" : "mousemove",
        end: SUPPORT_TOUCH ? "touchend" : "mouseup"
    };

    function translateX(posX) {
      setContainerStyle({
        transform: `translate3d(${posX}px, 0, 0)`,
      });
    }
  
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
  
    const drag$ = start$.pipe(
      switchMap(start => move$.pipe(
        map(move => move - start),
        takeUntil(end$)
      )),
      share(),
      map(distance => ({ distance }))
    )
  
    // drag$.subscribe(distance => console.log("start$와 move$의 차이값", distance));
    // drag는 drag$가 전달하는 start$와 move$의 위치 값의 거리
    const drop$ = drag$.pipe(
      switchMap(drag => end$.pipe(
        map(event => drag),
        first()
      )),
      withLatestFrom(size$, (drag, size) => {
        return { ...drag, size };
      })
    );
  
    const carousel$ = merge(drag$, drop$)
      .pipe(
        scan((store, {distance, size}) => {
            const updateStore = {
                from: -(store.index * store.size) + distance
            };
        
            if (size === undefined) { // drag 시점
                updateStore.to = updateStore.from;
            } else {  // drop 시점
                let tobeIndex = store.index;
                if (Math.abs(distance) >= THRESHOLD) {
                    tobeIndex = distance < 0 ?
                        Math.min(tobeIndex + 1, PANEL_COUNT - 1) : 
                        Math.max(tobeIndex - 1, 0);
                }
                updateStore.index = tobeIndex;
                updateStore.to = -(tobeIndex * size);
                updateStore.size = size;
            }
            return { ...store, ...updateStore };
        }, {
            from: 0,
            to: 0,
            index: 0,
            size: 0,
        })
    )

    carousel$.subscribe(store => {
      console.log("캐로셀 데이터", store);
      translateX(store.to);
  });
  }, []);

  return (
    <div id="carousel9" className={styles.view}>
      <ul className={styles.container} style={containerStyle}>
        <li className={styles.panel}></li>
        <li className={styles.panel}></li>
        <li className={styles.panel}></li>
        <li className={styles.panel}></li>
      </ul>
    </div>
  )
}