import React from "react";
import Slider from 'react-slick';
import { Link } from "react-router-dom";
// import css
import '../../../style/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerCarousel = ()=>{
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3200,
        pauseOnHover: true,
    };

    return(
        <div classname="bannercarousel">
            <Slider {...settings}>
                <img className='main-logo1' img src="images/banner1.png"/>
                <Link to="/find">
                <img className='main-logo2' img src="images/banner2.png"/>
                </Link>         
                <img className='main-logo3' img src="images/banner3.png"/>
            </Slider>
        </div>    
    )
};

export default BannerCarousel;