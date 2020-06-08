import React, { useEffect, useState } from 'react';

import { fromEvent } from 'rxjs';
import {
  map, debounceTime,
  distinctUntilChanged,
  tap, partition, switchMap,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export const Search6 = () => {
  const [items, setItems] = useState([{login: '검색어를 입력하세요.'}]);

  useEffect(() => {
    const keyup$ = fromEvent(document.getElementById('search6'), 'keyup')
      .pipe(
        debounceTime(300),
        map(event => event.target.value),
        distinctUntilChanged(), // 특수문자가 나오지 않기 위해 중복 데이터 처리
      )
    
    let [user$, reset$] = keyup$.pipe(
      partition(query => query.trim().length > 0)
    )
    
    user$ = user$.pipe(
      tap(_value => setItems([{login: '로딩 중...'}])),
      // mergeMap 은 기존에것 유지, switchMap 은 덮어씌우기
      // 네트워크 환경이 느려 먼저 보낸 요청에 답이 나중에 보낸 요청에 답보다 늦게 오는걸 방지하기 위함
      // 먼저 보낸 요청을 취소함
      switchMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
      tap(value => setItems(value.items))
    );

    reset$ = reset$.pipe(
      tap(_value => setItems([{login: '검색어를 입력하세요.'}]))
    )
    
      user$.subscribe();
      reset$.subscribe();
  }, []);

  return (
    <>
      <input id="search6" type="text" placeholder="RxJS Search test"/>
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