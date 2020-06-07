import React, { useEffect, useState } from 'react';

import { fromEvent } from 'rxjs';
import { map, debounceTime, filter, mergeMap, distinctUntilChanged } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import * as styles from './search.css';

export const Search = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const keyup$ = fromEvent(document.getElementById('search'), 'keyup')
      .pipe(
        debounceTime(300),
        map(event => event.target.value),
        distinctUntilChanged(), // 특수문자가 나오지 않기 위해 중복 데이터 처리
        filter(query => query.trim().length > 0),
        mergeMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`))
      )
    
      keyup$.subscribe(value => {
        console.log('Searched value', value.items);
        setItems(value.items)
      })
  }, []);

  return (
    <>
      <input className={styles.input} id="search" type="text" placeholder="RxJS Search test"/>
      <div>
        {
          items.map((item) => {
            return (<div key={item.login}>{item.login}</div>);
          })
        }
      </div>
    </>
  )
}