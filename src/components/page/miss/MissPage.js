/**
 * ./src/components/page/miss/MissPage.js
 * 실종 게시판
 */
import React from "react";
import { Link } from "react-router-dom";
import Carousel  from "./carousel";
import "./MissPage.scss";


export const MissPage = () => {
    return (
        <>
            <div className="miss-page">
                <div className="miss-page-upload-btn">
                <h2>실종 게시판</h2>
                <Link to="upload"> 실종 등록하기</Link>
                <button type="button" onclick="location.href='UploadPage.js'">실종 등록하기</button>
                </div>

                <br/>
                <div className="misspage-moreInfo-btn">
                <h3>최근 실종 순</h3> 
                <Link to="moreInfo">더보기</Link>
                </div>
                <Carousel category={"Missing"} cg={"moreInfo"}/>

                <br/><br/>
                <div className="miss-page-moreInfo2-btn">
                <h3>우리 지역 관련 순</h3>
                <Link to="moreInfo2">더보기</Link> 
                </div>

                <Carousel category={"Missing"} cg={"moreInfo2"}/>
            </div>
        </>
    );
};