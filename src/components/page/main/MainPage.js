/**
 * ./src/components/page/main/MainPage.js
 * 메인 홈
 */
import BannerCarousel  from "./banner";
import React from "react";
import ReactPlayer from 'react-player'

export const MainPage = () => {
    return (
        <>
            <div className="main-page">
            <BannerCarousel/>
                <br/><br/>
                <ReactPlayer className="video" 
                url="https://www.youtube.com/watch?v=XMsDXtFWJ2U" 
                width="520px"
                height="320px"
                playing={true}
                muted={true}
                controls={true}
                />
            </div>
        </>
    );
};