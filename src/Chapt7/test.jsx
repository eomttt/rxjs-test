import React, { useEffect } from 'react';

import { Observable, Subject } from 'rxjs';

// Observable: https://rxjs-dev.firebaseapp.com/guide/observable
// Subject: https://rxjs-dev.firebaseapp.com/guide/subject

// Observable vs Subject: https://medium.com/@rkdthd0403/rxswift-subject-99b401e5d2e5

export const Test7 = () => {
  useEffect(() => {
    const observable = new Observable((subscriber) => {
      subscriber.next(Math.random())
    });
    const subject = new Subject();

    subject.subscribe((value) => {
      console.log(`Subject 1 ${value}`)
    });
    observable.subscribe((value) => {
      console.log(`Observable 1 ${value}`)
    });

    subject.next(Math.random());

    subject.subscribe((value) => {
      console.log(`Subject 2 ${value}`)
    });
    observable.subscribe((value) => {
      console.log(`Observable 2 ${value}`)
    });

    subject.next(Math.random());
  }, []);

  return (
    <div>
      Chapter 7 Test
    </div>
  )
}