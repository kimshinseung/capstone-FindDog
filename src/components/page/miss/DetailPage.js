/**
 * ./src/components/page/miss/DetailPage.js
 * 상세 페이지
 */

import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase';

export const DetailPage = (props) => {
    let {id} = useParams();
    //console.log(id);

    const navigate = useNavigate();

    const back = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <>
        <h2>상세 페이지</h2>
        <p>게시글 번호: {id}</p>
        <img src={`images/missfind${id}.jpg`} width={300} height={300} />
        {/* <h4>이름: {Array.from(props)[id].name}</h4>
        <p>실종위치: {Array.from(props)[id].missedplace}</p> */}
        {/* <p>test: {Array.from(props).map((item, i) => {
            item[i].name
            console.log("item: " + item[i].name);
        })}</p> */}
        <br/>
        <button onClick={back}>뒤로가기</button>
        </>
    );
}