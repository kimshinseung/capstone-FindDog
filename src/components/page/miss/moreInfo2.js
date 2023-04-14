/**
 * ./src/components/page/miss/MissPage.js
 * 실종 우리 지역 관련 순 더보기란
 */

import React from "react";
import data from './data';
import Card from './card';
import { useNavigate, Link } from "react-router-dom";

const Moreinfo2Page = () => {
    return (
 <>
            <div className="moreInfo2-page">
                <h2>실종 게시판</h2>
                <Link to="upload"> 실종 등록하기</Link>
                <br/>
                <h3>우리 지역 관련 순</h3> 
                <br/>
            </div>
        </>
    );
};

export default Moreinfo2Page