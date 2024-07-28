import React, { useRef, useEffect } from 'react';
import "./App.css";
import { carouselItems } from './CarouselItems';

const Carousel = () => {
  const carouselRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const backButtonRef = useRef(null);
  const seeMoreButtonsRef = useRef([]);

  let unAcceptClick;

  useEffect(() => {
    const nextButton = nextButtonRef.current;
    const prevButton = prevButtonRef.current;
    const backButton = backButtonRef.current;
    const carousel = carouselRef.current;
    const seeMoreButtons = seeMoreButtonsRef.current;

    const showSlider = (type) => {
      nextButton.style.pointerEvents = 'none';
      prevButton.style.pointerEvents = 'none';

      carousel.classList.remove('prev', 'next');
      let items = carousel.querySelectorAll('.list .item');
      if (type === 'next') {
        carousel.querySelector('.list').appendChild(items[0]);
        carousel.classList.add('next');
      } else {
        let positionLast = items.length - 1;
        carousel.querySelector('.list').prepend(items[positionLast]);
        carousel.classList.add('prev');
      }
      clearTimeout(unAcceptClick);
      unAcceptClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
      }, 1000);
    }

    nextButton.onclick = () => showSlider('next');
    prevButton.onclick = () => showSlider('prev');

    seeMoreButtons.forEach(button => {
      button.onclick = () => {
        carousel.classList.add('showDetail');
      }
    });

    backButton.onclick = () => {
      carousel.classList.remove('showDetail');
    };

    return () => {
      nextButton.onclick = null;
      prevButton.onclick = null;
      backButton.onclick = null;
      seeMoreButtons.forEach(button => {
        button.onclick = null;
      });
    };
  }, []);

  return (
    <div>
      <div className="carousel" ref={carouselRef}>
        <div className="list">
          {carouselItems.map((item, index) => (
            <div className="item" key={index}>
              <img src={item.image} alt={`ear${index + 1}`} />
              <div className="intro">
                <div className="title">{item.title}</div>
                <div className="topic">{item.topic}</div>
                <div className="des">{item.description}</div>
                <button className="seeMore" ref={(el) => seeMoreButtonsRef.current[index] = el}>See details</button>
              </div>
              <div className="detail">
                <div className="title">{item.detailTitle}</div>
                <div className="des">{item.detailDescription}</div>
                <div className="specifications">
                  <div>
                    <p>Used time</p>
                    <p>{item.specifications.usedTime}</p>
                  </div>
                  <div>
                    <p>Port</p>
                    <p>{item.specifications.chargingPort}</p>
                  </div>
                  <div>
                    <p>Compatible</p>
                    <p>{item.specifications.compatible}</p>
                  </div>
                  <div>
                    <p>Bluetooth</p>
                    <p>{item.specifications.bluetooth}</p>
                  </div>
                  <div>
                    <p>Price</p>
                    <p>{item.specifications.price}</p>
                  </div>
                </div>
                <div className="checkout">
                  <button className="cart">Add to cart</button>
                  <button className="check">Check out</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button id="prev" ref={prevButtonRef}>back</button>
          <button id="back" ref={backButtonRef}>Back</button>
          <button id="next" ref={nextButtonRef}>next</button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
