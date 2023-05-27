/**
 * ./src/components/page/find/FindMoreInfo.js
 * 목격 최근 실종 순 더보기란
 */

import React, {useState, useEffect} from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";

import { Link, useNavigate } from "react-router-dom";
import '../../../style/style.css';

const FindMoreinfoPage = () => {
    const [findPost, setFindPost] = useState([]);

    const navigate = useNavigate();

    const toUpload = () => {
        navigate(`/find/upload`); // 등록 페이지로 이동
    };

    const toBack = () => {
        navigate(`/find`); // 목격 게시판으로 이동
    }

    useEffect(() => {
        // firebase의 Missing Collection에서 글 목록 가져오기
        const setPost = async () => {
            const QuerySnapshot = await getDocs(query(collection(db, "Finding"), orderBy("uploadTime", "desc")));
            const data = QuerySnapshot.docs.map((doc, i) => ({
                ids: i,
                ...doc.data()
            }));
            // console.log(Array.from(data));
            setFindPost(Array.from(data));
        }

        setPost();
    }, []);

    return (
        <>
            <div className="moreInfo-page">
                <h2>목격 게시판</h2>
                <br/><br/>
                <button className="" type="button" onClick={toBack}>뒤로 가기</button>
                <button className="" type="button" onClick={toUpload}>목격 등록하기</button>
                <br/><br/><br/>
                <h3>최근 목격 순</h3> 
                <br/>
                <table className="">
                    <th>번호</th>
                    <th>목격 장소</th>
                    <th>목격일</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    {findPost.map(({ user, address, uploadTime, date, ids }) => (
                    <tr className="posting-tr">
                        <td>
                            <p className="posting-id" key={ids}>{ids+1}</p>
                        </td>
                        <td>
                            <Link to={`/miss/moreInfo/detail/${ids + 1}`}>
                                <p className="" key={ids}>{address}</p>
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

export default FindMoreinfoPage