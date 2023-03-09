import React, {useState} from "react";
//import {Row, Container} from 'reactstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './card';


const Carousel = (a)=>{
  console.log(a);
  let data = [
    {
      id : 0,
      name : "버블",
      missedplace : "성북구 한성대학교 앞"
    },
  
    {
      id : 1,
      name : "달고나",
      missedplace : "화계역 앞"
    },
  
    {
      id : 2,
      name : "라떼",
      missedplace : "남위례역 앞"
    }
  ]
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