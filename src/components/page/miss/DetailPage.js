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
            const QuerySnapshot = await getDocs(query(collection(db, "Missing"), orderBy("uploadTime", "desc")));
            const data = QuerySnapshot.docs.map((doc, i) => ({
                    ids: i,
                    ...doc.data()
                }
            ));

            // data의 ids+1 과 파라미터를 가져와 비교해서 같은 수면 return
            const detail = data.filter((d) => {
                if((d.ids + 1) === parseInt(no, 10)) {
                    return d;
                }
            });

            // profiles useState() set
            setProfiles(detail);
        };

        // fetch
        fetchData();
    }, [location]);

    return (
        <>
        <h2>상세 페이지</h2>
        <p>게시글 번호: {no}</p>

        {profiles.length > 0 && (
            <div>
                <div>
                    {profiles[0].imgs.map((url, i) => <img src={url} width={300} height={300}/>)}
                </div>
                <h4>이름: {profiles[0].name}</h4>
                <p>업로드 날짜: {profiles[0].uploadTime.toDate().toLocaleDateString()} / {profiles[0].uploadTime.toDate().toLocaleTimeString()}</p>
                <p>실종위치: {profiles[0].address}</p>
                <p>실종시간: {profiles[0].date} </p>
                <p>종: {profiles[0].specify}</p>
                <p>나이: {profiles[0].age}</p>
                <p>성별: {profiles[0].gender}</p>
                <p>중성화 여부: {profiles[0].neutering}</p>
                <p>카카오톡 아이디: {profiles[0].kakaoId}</p>
                <p>털색: {profiles[0].farColor1}, {profiles[0].farColor2} </p>
                <p>특징: {profiles[0].feature}</p>
            </div>
        )}

        <br/>
        <button onClick={back}>뒤로가기</button>
        <br/><br/>
        </>
    );
}