/**
 * ./src/components/page/find/FindMoreInfo2.js
 * 목격 우리 지역 관련 순 더보기란
 */

import React from "react";
import { useNavigate } from "react-router-dom";

import '../../../style/style.css';
import "../miss/moreInfo.scss";

const FindMoreinfoPage = () => {
    const navigate = useNavigate();

    const toUpload = () => {
        navigate(`/find/upload`); // 등록 페이지로 이동
    }

    return (
        <>
            <div className="moreInfo-page">
                <div className="moreInfo-page-upload-btn">
                <h2>목격 게시판</h2>
                <button className="moreInfo-page-upload-btn2" type="button" onClick={toUpload}>목격 등록하기</button>
                </div>

                <br/>
                <h3>우리 지역 관련 순</h3> 
                <br/>
            </div>
        </>
    );
};

export default FindMoreinfoPage