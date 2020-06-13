import React, { useEffect, useState } from 'react';

import { fromEvent, Subject } from 'rxjs';
import {
  map, debounceTime,
  distinctUntilChanged,
  tap, partition, switchMap,
  publish, refCount, share,
  multicast,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export const Search7 = () => {
  const [items, setItems] = useState([{login: '검색어를 입력하세요.'}]);

  useEffect(() => {
    const keyup$ = fromEvent(document.getElementById('search7'), 'keyup')
      .pipe(
        debounceTime(300),
        map(event => event.target.value),
        distinctUntilChanged(),
        tap(value => console.log('from keyup$', value)),
        // publish() 만 사용 하였을 때에 const keyupConnector = keyup$.connect() 한 후 keyupConnector.unsubscribe() 가 필요한데 refCount 를 사용하면 필요 없음
        // publish(), // multicast(new Subject()) 와 동일
        // refCount(),
        share(), // publish, refCount 두개 같이 사용한거와 같은 효과
        // subject를 사용하는 대신 connectableObservable 사용함
      )

    let [user$, reset$] = keyup$.pipe(
      partition(query => query.trim().length > 0)
    )
    
    user$ = user$.pipe(
      tap(_value => setItems([{login: '로딩 중...'}])),
      switchMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
      tap(value => setItems(value.items)),
      tap(value => console.log('from user$', value))
    );

    reset$ = reset$.pipe(
      tap(_value => setItems([{login: '검색어를 입력하세요.'}])),
      tap(value => console.log('from reset$', value))
    )


    user$.subscribe();
    reset$.subscribe();
    // keyup$.connect(); // publish 만 쓸 경우 필요, refCount 를 사용하면서 불필요
  }, []);

  return (
    <>
      <input id="search7" type="text" placeholder="RxJS Search test"/>
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