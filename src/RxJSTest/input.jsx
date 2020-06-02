import React, { useEffect } from 'react';

import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export const Input = () => {
  useEffect(() => {
    const keyup$ = fromEvent(document.getElementById('search'), 'keyup')
      .pipe(
        map(event => event.target.value),
      )
    
      keyup$.subscribe(value => {
        console.log('Input value', value);
      })
  }, []);

  return (
    <input id="search" type="text" placeholder="RxJS Input test"/>
  )
}