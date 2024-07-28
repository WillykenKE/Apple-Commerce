import React from 'react';
// import Carousel from './Carousel';
import './App.css'
import Carousel from './Carousel';

const App = () => {
  return (
    <>
      <header>
        <div class="logo">Apple.Tech</div>
        <nav>
            <a href="/">Entertainment</a>
            <a href="/">Support</a>
            <a href="/">Info</a>
        </nav>
    </header>
    <Carousel />
    </>
  );
};

export default App;
