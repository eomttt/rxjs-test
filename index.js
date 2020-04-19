const { Observable } = require('rxjs');

const observableCreated$ = Observable.create((observer) => {
  for (let i=1; i<=10; i++) {
    setTimeout(() => {
      observer.next(i);
      if (i === 10) {
        observer.complete();
      }
    }, 300 * i);
  }
});

observableCreated$.subscribe(
  function next(i) {
    console.log('Observer 1', i);
  },
  function complete() {
    console.log('Observer 1 complete');
  }
);

setTimeout(() => {
  observableCreated$ .subscribe(
    function next(i) {
      console.log('Observer 2', i);
    },
    function complete() {
      console.log('Observer 2 complete');
    }
  );
}, 1350);