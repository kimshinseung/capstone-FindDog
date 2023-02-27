import React from "react";
import Slider from 'react-slick';
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
                <img className='main-logo1' img src="images/banner.jpg" width={300} height={300}/>
                <img className='main-logo2' img src="images/banner.jpg" width={300} height={300}/>
                <img className='main-logo3' img src="images/banner.jpg" width={300} height={300}/>
            </Slider>
        </div>    
    )
};

export default BannerCarousel;