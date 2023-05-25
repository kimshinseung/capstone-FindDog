/**
 * ./src/components/page/forum/ForumPage.js
 * 자유 게시판
 */

import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";

import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import styled from "styled-components";

export const ForumPage = () => {
    const [posting, setPosting] = useState([]);
    
    const [limit, setLimit] = useState(10); // 페이지 당 게시물 수(기본 10개씩)
    const [now, setNow] = useState(1);      // 현재 페이지 번호(시작은 첫번째)
    const offset = (now - 1) * limit;       // 각 페이지의 첫 게시물 위치

    useEffect(() => {
        // firebase의 Forum Collection에서 글 목록 가져오기
        const setPost = async () => {
            const QuerySnapshot = await getDocs(query(collection(db, "Forum"), orderBy("uploadTime", "desc")));
            const data = QuerySnapshot.docs.map((doc, i) => ({
                id: i,
                ...doc.data()
            }));
            // console.log(Array.from(data));
            setPosting(Array.from(data));
        }

        setPost();
    }, []);

    const navigate = useNavigate();

    const toUploadHandler = () => {
        navigate('/forum/general');
    }

    return (
        <>
        <div className="forum-page">
            <h2>자유게시판</h2>
            
            한 페이지 당 표시할 게시물 수:
            <select type="number" value={limit}
                onChange={({ target: { value } }) => setLimit(Number(value))}>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
            </select>
            <br/>

            <br/>
            <button onClick={toUploadHandler}>글 올리기</button>
            <br/><br/>
            <div className="forum-posts">
                <table>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    {posting.slice(offset, offset + limit).map(({ title, user, uploadTime, id }) => (
                    // table로 묶으니까 얘네 알아서 스타일이 생겼다??
                    <tr className="posting-tr">
                        <td>
                            <p className="posting-id" key={id}>{id}</p>
                        </td>
                        <td>
                            <Link to={`/forum/posting/${id + 1}`}>
                                <p className="posting-title" key={id}>{title}</p>
                            </Link>
                        </td>
                        <td>
                            <p className="posting-user" key={id}>{user != null ? user : "익명"}</p>
                        </td>
                        <td>
                            <p className="posting-date" key={id}>{uploadTime.toDate().toLocaleDateString()}</p>
                        </td>
                    </tr>       
            ))}
                </table>
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