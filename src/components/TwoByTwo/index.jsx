import React from 'react';

import { Observable } from 'rxjs';

const TwoByTwo = () => {
  const onClickStart = () => {
    const ObservableCreated = Observable.create((observer) => {
      for (let i=1; i<=10; i++) {
        setTimeout(() => {
          observer.next(i);
          if (i === 10) {
            observer.complete();
          }
        }, 300 * i);
      }
    });

    ObservableCreated.subscribe(
      function next(i) {
        console.log('Observer 1', i);
      },
      function complete() {
        console.log('Observer 1 complete');
      }
    )

    setTimeout(() => {
      ObservableCreated.subscribe(
        function next(i) {
          console.log('Observer 2', i);
        },
        function complete() {
          console.log('Observer 2 complete');
        }
      )
    }, 1350);
  }

  return (
    <button
      onClick={onClickStart}
    >
      START
    </button>
  );
};

export default TwoByTwo;
