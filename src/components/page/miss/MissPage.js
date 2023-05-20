/**
 * ./src/components/page/miss/MissPage.js
 * 실종 게시판
 */
import React from "react";
import { Link } from "react-router-dom";
import Carousel  from "./carousel";


export const MissPage = () => {
    return (
        <>
            <div className="miss-page">
                <h2>실종 게시판</h2><br/>
                <Link to="upload"> 실종 등록하기</Link>

                <br/><br/><br/>
                <h3>최근 실종 순</h3> 
                <Link to="moreInfo"> 더보기</Link>
                <br/>
                <Carousel category={"Missing"}/>

                <br/><br/><br/>
                <h3>우리 지역 관련 순</h3>
                <Link to="moreInfo2"> 더보기</Link> 
                <br/>
                <Carousel category={"Missing"}/>
            </div>
        </>
    );
};