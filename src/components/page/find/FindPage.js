/**
 * ./src/components/page/find/FindPage.js
 * 목격 게시판
 */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../miss/carousel";

export const FindPage = () => {
    const navigate = useNavigate();

    const toUpload = () => {
        navigate(`/find/upload`); // 등록 페이지로 이동
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
                <h2>목격 게시판</h2>
                <button type="button" onClick={toUpload}>목격 등록하기</button>
                <br/><br/><br/>
                <h3>최근 목격 순</h3> 
                <button type="button" onClick={toMoreInfo}>더보기</button>
                <br/>
                <Carousel category={"Finding"} cg={"moreInfo"}/>

                <br/><br/><br/>
                <h3>우리 지역 관련 순</h3>
                <button type="button" onClick={toMoreInfo2}>더보기</button>
                <br/>
                <Carousel category={"Finding"} cg={"moreInfo2"}/>
            </div>
        </>
    );
};