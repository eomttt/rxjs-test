import React from 'react';

import { Search5 } from './Chapt5/search';
import { Search6 } from './Chapt6/search';
import { Test7 } from './Chapt7/test';
import { Search7  } from './Chapt7/serach';

const App = () => {
  return (
    <div>
      <h1>
        RXJS TEST React Project
      </h1>
      <div>
        <h2>Chapt 5</h2>
        <Search5 />
      </div>
      <div>
        <h2>Chapt 6</h2>
        <Search6 />
      </div>
      <div>
        <h2>Chapt 7</h2>
        <Test7 />
        <Search7 />
      </div>
    </div>
  )
};

export default App;