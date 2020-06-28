import React from 'react';

import { Search5 } from './Chapt5/search';
import { Search6 } from './Chapt6/search';
import { Test7 } from './Chapt7/test';
import { Search7  } from './Chapt7/serach';

import { Carousel8 } from './Chapt8/carousel';
import { Carousel9 } from './Chapt9/carousel';
import { Scheduler10 } from './Chapt10/scheduler';

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
      <div>
        <h2>Chapt 8</h2>
        <Carousel8 />
      </div>
      <div>
        <h2>Chapt 9</h2>
        <Carousel9 />
      </div>
      <div>
        <h2>Chapt 10</h2>
        <Scheduler10 />
      </div>
    </div>
  )
};

export default App;