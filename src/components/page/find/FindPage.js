/**
 * ./src/components/page/find/FindPage.js
 * 목격 게시판
 */
import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../miss/carousel";

export const FindPage = () => {
    return (
        <>
            <div className="find-page">
                <h2>목격 게시판</h2>
                <Link to="upload"> 목격 등록하기</Link>
                <br/><br/><br/>
                <h3>최근 목격 순</h3> 
                
                <br/>
                <Carousel category={"Finding"} cg={"moreInfo"}/>

                <br/><br/><br/>
                <h3>우리 지역 관련 순</h3>
                
                <br/>
                <Carousel category={"Finding"} cg={"moreInfo2"}/>
            </div>
        </>
    );
};