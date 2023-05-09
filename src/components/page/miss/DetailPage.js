/**
 * ./src/components/page/miss/DetailPage.js
 * 상세 페이지
 */

import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { getDocs, collection, query } from "firebase/firestore";

export const DetailPage = (props) => {
    let no = useParams();
    //console.dir(no);

    const navigate = useNavigate();

    const back = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    //console.log(props.data[no.id]);
    // Create a reference to the cities collection
    

    // Create a query against the collection.
   

    // 가져올 게시글 내용
    const [profiles, setProfiles] = useState(async () => {
        const QuerySnapshot = await getDocs(query(collection(db, "Missing")));
        
        const data = QuerySnapshot.docs.map((doc) => ({
                ids: doc.data().id,
                ...doc.data()
            }
        ));

        const detail = data.filter((d) => {
            if(d.ids === no.id) {
                return d;
            }
        });
        
        // console.log(detail);
        //return Array.from(data);
        setProfiles(Array.from(detail)).then;
        console.log(Array.from(profiles));
      });

      

    return (
        <>
        <h2>상세 페이지</h2>
        <p>게시글 번호: {no.id}</p>
        {/* <img width="300" height="300" src={Array.from(profiles)[0].imgs[0].img} /> */}
        <h4>이름: {Array.from(profiles)[0].name} </h4>
        <p>실종위치: {Array.from(profiles)[0].address}</p>
        <p>실종시간: {Array.from(profiles)[0].date} </p>
        <p>종: {Array.from(profiles)[0].specify}</p>
        <p>나이: {Array.from(profiles)[0].age}</p>
        <p>성별: {Array.from(profiles)[0].gender}</p>
        <p>중성화 여부: {Array.from(profiles)[0].neutering}</p>
        <p>연락처: {Array.from(profiles)[0].tel}</p>
        <p>털색: {Array.from(profiles)[0].farColor1}, {Array.from(profiles)[0].farColor2} </p>
        <p>특징: {Array.from(profiles)[0].feature}</p>
        <br/>
        <button onClick={back}>뒤로가기</button>
        <br/><br/>
        </>
    );
}