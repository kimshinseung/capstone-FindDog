/**
 * ./src/components/page/miss/MissPage.js
 * 실종 최근 실종 순 더보기란
 */

import React from "react";
import data from './data';
import Card from './card';
import { useNavigate, Link } from "react-router-dom";
import '../../../style/style.css';

const MoreinfoPage = () => {
    return (
 <>
            <div className="moreInfo-page">
                <h2>실종 게시판</h2>
                <br/><br/>
                <Link to="upload">실종 등록하기</Link>
                <br/><br/><br/>
                <h3>최근 실종 순</h3> 
                <br/>
            </div>
        </>
    );
};

export default MoreinfoPage