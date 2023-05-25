/**
 * ./src/components/page/miss/MissPage.js
 * 실종 게시판
 */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel  from "./carousel";
import "./MissPage.scss";


export const MissPage = () => {
    const navigate = useNavigate();
    
    const toUpload = () => {
        navigate(`/miss/upload`); // 업로드 페이지로 이동
    }

    const toMoreInfo = () => {
        navigate(`/miss/moreInfo`); // 최신 순 더보기로 이동
    }

    const toMoreInfo2 = () => {
        navigate(`/miss/moreInfo2`); // 지역 순 더보기로 이동
    }

    return (
        <>
            <div className="miss-page">
                <div className="miss-page-upload-btn">
                <h2>실종 게시판</h2>
                <button type="button" onClick={toUpload}>실종 등록하기</button>
                </div>

                <br/>
                <div className="misspage-moreInfo-btn">
                <h3>최근 실종 순</h3> 
                <button type="button" onClick={toMoreInfo}>더보기</button>
                </div>
                <Carousel category={"Missing"} cg={"moreInfo"}/>

                <br/><br/>
                <div className="miss-page-moreInfo2-btn">
                <h3>우리 지역 관련 순</h3>
                <button type="button" onClick={toMoreInfo2}>더보기</button>
                </div>

                <Carousel category={"Missing"} cg={"moreInfo2"}/>
            </div>
        </>
    );
};