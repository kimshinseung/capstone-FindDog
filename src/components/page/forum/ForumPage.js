/**
 * ./src/components/page/posting/PostingPage.js
 * 자유 게시판
 */

import React from "react";
import { Pagination } from "./Pagination";
import { useNavigate } from "react-router-dom";

export const ForumPage = () => {

    const navigate = useNavigate();

    const toUploadHandler = () => {
        navigate('/forum/general');
    }

    return (
        <>
        <div className="forum-page">
            <h2>자유게시판</h2>
            <br/>
            <button onClick={toUploadHandler}>글 올리기</button>
            <br/><br/>
            <Pagination/>
        </div>
        </>
    );
};