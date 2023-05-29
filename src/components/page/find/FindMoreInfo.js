/**
 * ./src/components/page/find/FindMoreInfo.js
 * 목격 | 최근 목격 순 더보기란
 */

import React, {useState, useEffect} from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";

import { Link, useNavigate } from "react-router-dom";
import '../../../style/style.css';
import "../miss/moreInfo.scss";

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
                <div className="moreInfo-page-upload-btn">
                <h2>목격 게시판</h2>
                <button className="moreInfo-page-Back-btn" type="button" onClick={toBack}>뒤로 가기</button>
                <button className="moreInfo-page-upload-btn2" type="button" onClick={toUpload}>목격 등록하기</button>
                </div>

                <br/>
                <div className="moreInfo-table">
                <h3>최근 목격 순</h3>
                <table className="moreInfo-table2">
                    <th width="6%">번호</th>
                    <th width="35%">사진</th>
                    <th width="10%">목격 장소</th>
                    <th width="15%">목격일</th>
                    <th width="11%">작성자</th>
                    <th width="17%">작성일</th>
                    {findPost.map(({ user, address, uploadTime, date, imgs, ids, id }) => (
                    <tr className="moreInfo-table-td">
                        <td>
                            <p className="moreInfo-table-td-number" key={ids}>{ids+1}</p>
                        </td>
                        <td>
                            <img className="moreInfo-table-td-imgs" key={ids} src={imgs[0]} width="30%"/>
                        </td>
                        <td>
                            <Link to={`/find/moreInfo/detail/${id}`}>
                                <p className="moreInfo-table-td-adress" key={ids}>{address}</p>
                            </Link>
                        </td>
                        <td>
                            <p className="moreInfo-table-td-date" key={ids}>{date}</p>
                        </td>
                        <td>
                            <p className="moreInfo-table-td-user" key={ids}>{user != null ? user : "익명"}</p>
                        </td>
                        <td>
                            <p className="moreInfo-table-td-uploadDate" key={ids}>{uploadTime.toDate().toLocaleDateString()}</p>
                        </td>
                    </tr>       
                    ))}
                </table>
                <br/><br/>
                </div>
            </div>
        </>
    );
};

export default FindMoreinfoPage