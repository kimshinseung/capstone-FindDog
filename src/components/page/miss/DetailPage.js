/**
 * ./src/components/page/miss/DetailPage.js
 * 상세 페이지
 */

import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { getDocs, collection, query, orderBy } from "firebase/firestore";

export const DetailPage = () => {
    let { id } = useParams();
    const no = id;

    const navigate = useNavigate();

    const back = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const location = useLocation();
   

    // 가져올 게시글 내용
    const [profiles, setProfiles] = useState([]);

      // useEffect
      useEffect(() => {
        const fetchData = async () => {
            // 여기서 비동기 작업 수행
            const QuerySnapshot = await getDocs(query(collection(db, "Missing"), orderBy("uploadTime")));

            const data = QuerySnapshot.docs.map((doc, i) => ({
                    ids: i,
                    ...doc.data()
                }
            ));

            const detail = data.filter((d) => {
                // console.log(String(d.ids));
                if(String(d.ids) === no.id) {
                    return d;
                }
            });
        
            // console.dir(Array.from(data));
            setProfiles(detail);
            // console.log(Array.from(detail));
        };

        fetchData();

        // console.log(Array.from(profiles));
      }, [location]);

      

    return (
        <>
        <h2>상세 페이지</h2>
        <p>게시글 번호: {no}</p>
        {/* <img width="300" height="300" src={Array.from(profiles)[0].imgs[0].img} /> */}
        {/* <p>test: {console.log(Array.from(profiles))}</p>
        
        <h4>이름: {Array.from(profiles)[0].name} </h4> */}
        {/* <p>업로드 날짜: {Array.from(profiles)[0].uploadTime}</p> */}
        {/* <p>실종위치: {Array.from(profiles)[0].address}</p>
        <p>실종시간: {Array.from(profiles)[0].date} </p>
        <p>종: {Array.from(profiles)[0].specify}</p>
        <p>나이: {Array.from(profiles)[0].age}</p>
        <p>성별: {Array.from(profiles)[0].gender}</p>
        <p>중성화 여부: {Array.from(profiles)[0].neutering}</p>
        <p>연락처: {Array.from(profiles)[0].tel}</p>
        <p>털색: {Array.from(profiles)[0].farColor1}, {Array.from(profiles)[0].farColor2} </p>
        <p>특징: {Array.from(profiles)[0].feature}</p> */}

        {profiles.length > 0 && (
            <div>
                <h4>이름: {profiles[0].name}</h4>
                <p>asdf</p>
            </div>
        )}
        <br/>
        <button onClick={back}>뒤로가기</button>
        <br/><br/>
        </>
    );
}