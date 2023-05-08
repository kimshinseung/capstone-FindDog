/**
 * ./src/components/page/posting/PostingPage.js
 * 자유 게시판
 */

import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../../firebase";

export const ForumPage = () => {
    const [posting, setPosting] = useState([]);
    
    const [limit, setLimit] = useState(10); // 페이지 당 게시물 수(기본 10개씩)
    const [now, setNow] = useState(1);      // 현재 페이지 번호(시작은 첫번째)
    const offset = (now - 1) * limit;       // 각 페이지의 첫 게시물 위치

    useEffect(async () => {
        // firebase의 Forum Collection에서 글 목록 가져오기
        setPost();
        
    }, []);

    const setPost = async () => {
        const QuerySnapshot = await getDocs(query(collection(db, "Forum")));
        const data = QuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        // console.log(Array.from(data));
        setPosting(Array.from(data));
        // console.log(posting);
    }

    const navigate = useNavigate();

    const toUploadHandler = () => {
        navigate('/forum/general');
    }

    return (
        <>
        <div className="forum-page">
            <h2>자유게시판</h2>
            
            한 페이지 당 표시할 게시물 수: 
            {/* 페이지 당 게시물 수: {limit} */}
            <select type="number" value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
            >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
            <br/>
            {/* 현재 페이지 번호: {now}<br/>
            각 페이지의 첫 게시물 위치: {offset}<br/><br/> */}

            <br/>
            <button onClick={toUploadHandler}>글 올리기</button>
            <br/><br/>
            <div className="forum-posts">
            {posting.slice(offset, offset + limit).map(({ text, id }) => (
                
                <p className="forum-posting" key={id}>{text}</p>

            ))}
            </div>
            <footer>
            <Pagination
            total={posting.length}
            limit={limit}
            now={now}
            setNow={setNow}
            />
            </footer>
        </div>
        </>
    );
};