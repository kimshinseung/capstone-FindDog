/**
 * ./src/components/page/main/banner.js
 * 메인 페이지 배너 캐러셀
 */

// import components
import React from "react";
import Slider from 'react-slick';
import { Link } from "react-router-dom";

// import css
import '../../../style/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../style/carouselDots.css';

const BannerCarousel = ()=>{
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3200,
        pauseOnHover: true,
        dotsClass: 'dots'
    };

    return(
        <div className="bannercarousel">
            <Slider {...settings}>
                <img className='main-logo1' src="images/banner1.png"/>
                <Link to="/find">
                    <img className='main-logo2' src="images/banner2.png"/>
                </Link>
                <img className='main-logo3' src="images/banner3.png"/>
            </Slider>
        </div>    
    )
};

export default BannerCarousel;