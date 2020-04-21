import React from 'react';

import { Observable, Subject } from 'rxjs';

const TwoByTwo = () => {
  const onClickTwoByTwo = () => {
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
      function error() {
        console.log('Observer 1 error')
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
        function error() {
          console.log('Observer 2 error')
        },
        function complete() {
          console.log('Observer 2 complete');
        }
      )
    }, 1350);
  }

  const onClickTwoByThree = () => {
    console.log('Click 2-3');
    const ObservableCreated = Observable.create((observer) => {
      console.log('Observer start');
      observer.next(1);
      observer.next(2);
      obeserver.complete();
      console.log('Observer end')
    });
    
    // subscribe 해야 실행됨
    setTimeout(() => {
      ObservableCreated.subscribe(
        function next(i) {
          console.log('Observer', i);
        },
        function error() {
          console.log('Observer error')
        },
        function complete() {
          console.log('Observer complete');
        }
      )
    }, 1000); 
  }

  const onClick2_8 = () => {
    const subject = new Subject();

    subject.subscribe((i) => {
      console.log('Observable 1', i);
    });

    subject.subscribe((i) => {
      console.log('Observable 2', i);
    });

    subject.next(1);
    subject.next(2);
  }

  return (
    <>
    <button onClick={onClickTwoByTwo}>
      2-2
    </button>
    <button onClick={onClickTwoByThree}>
      2-3
    </button>
    <button onClick={onClick2_8}>
      2-8
    </button>
    </>
  );
};

export default TwoByTwo;
