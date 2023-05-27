/**
 * ./src/components/page/miss/MissPage.js
 * 실종 | 최근 실종 순 더보기란
 */

import React, {useState, useEffect} from "react";
import { getAuth } from "firebase/auth";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";

import { Link, useNavigate } from "react-router-dom";
import '../../../style/style.css';

const MoreinfoPage = () => {
    const [missPost, setMissPost] = useState([]);

    const navigate = useNavigate();
    const auth = getAuth();
    
    const toUpload = () => {
        if(auth.currentUser == null) {
            alert("로그인이 필요합니다");
        }
        else {
            navigate(`/miss/upload`); // 업로드 페이지로 이동
        } 
    };

    useEffect(() => {
        // firebase의 Missing Collection에서 글 목록 가져오기
        const setPost = async () => {
            const QuerySnapshot = await getDocs(query(collection(db, "Missing"), orderBy("uploadTime", "desc")));
            const data = QuerySnapshot.docs.map((doc, i) => ({
                ids: i,
                ...doc.data()
            }));
            // console.log(Array.from(data));
            setMissPost(Array.from(data));
        }

        setPost();
    }, []);

    return (
        <>
            <div className="moreInfo-page">
                <h2>실종 게시판</h2>
                <br/><br/>
                <button className="" type="button" onClick={toUpload}>실종 등록하기</button>
                <br/><br/><br/>
                <h3>최근 실종 순</h3> 
                <br/>
                <table className="">
                    <th>번호</th>
                    <th>이름</th>
                    <th>실종일</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    {missPost.map(({ user, name, uploadTime, date, ids }) => (
                    <tr className="posting-tr">
                        <td>
                            <p className="posting-id" key={ids}>{ids+1}</p>
                        </td>
                        <td>
                            <Link to={`/miss/moreInfo/detail/${ids + 1}`}>
                                <p className="" key={ids}>{name}</p>
                            </Link>
                        </td>
                        <td>
                            <p className="" key={ids}>{date}</p>
                        </td>
                        <td>
                            <p className="" key={ids}>{user != null ? user : "익명"}</p>
                        </td>
                        <td>
                            <p className="" key={ids}>{uploadTime.toDate().toLocaleDateString()}</p>
                        </td>
                    </tr>       
                    ))}
                </table>
            </div>
        </>
    );
};

export default MoreinfoPage