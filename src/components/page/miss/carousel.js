import React, {useState} from "react";
import {Row, Container} from 'reactstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './card';
import data from './data';

const Carousel = ()=>{
  let [profiles] = useState(data);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        }

    return(
        <div className="carousel">
            <Slider {...settings}>
              {profiles.map((item, i) => <Card profiles={item} i={i+1} key={item.id} />)}
            </Slider>
        </div>
    )
};

export default Carousel;