import React, { useEffect, useState } from 'react';

import { fromEvent } from 'rxjs';
import { map, debounceTime, filter, mergeMap, distinctUntilChanged, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import * as styles from './search.css';

export const Search = () => {
  const [items, setItems] = useState([{login: '검색어를 입력하세요.'}]);

  useEffect(() => {
    const keyup$ = fromEvent(document.getElementById('search'), 'keyup')
      .pipe(
        debounceTime(300),
        map(event => event.target.value),
        distinctUntilChanged(), // 특수문자가 나오지 않기 위해 중복 데이터 처리
      )
    
    const user$ = keyup$
        .pipe(
          filter(query => query.trim().length > 0),
          tap(_value => setItems([{login: '로딩 중...'}])),
          mergeMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
          tap(value => setItems(value.items))
        )
    
    const reset$ = keyup$
          .pipe(
            filter(query => query.trim().length === 0),
            tap(_value => setItems([{login: '검색어를 입력하세요.'}]))
          )
    
      user$.subscribe();
      reset$.subscribe();
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