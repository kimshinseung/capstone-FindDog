/**
 * ./src/components/page/find/FindPage.js
 * 목격 게시판
 */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Carousel from "../miss/carousel";
import "./FindPage.scss";

export const FindPage = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const toUpload = () => {
        if(auth.currentUser == null){
            alert("로그인이 필요합니다");
        }
        else{ navigate(`/find/upload`); } // 등록 페이지로 이동
    }

    const toMoreInfo = () => {
        navigate(`/find/moreInfo`); // 최신 순 더보기로 이동
    }

    const toMoreInfo2 = () => {
        navigate(`/find/moreInfo2`); // 지역 순 더보기로 이동
    }

    return (
        <>
            <div className="find-page">
                <div className="find-page-upload-btn">
                <h2>목격 게시판</h2>
                <button className="find-page-upload-btn2" type="button" onClick={toUpload}>목격 등록하기</button>
                </div>

                <br/>
                <div className="find-page-moreInfo-btn">
                <h3>최근 목격 순</h3> 
                <button className="find-page-moreInfo-btn2" type="button" onClick={toMoreInfo}>더보기</button>
                </div>
                <Carousel category={"Finding"} cg={"moreInfo"}/>
            </div>
        </>
    );
};