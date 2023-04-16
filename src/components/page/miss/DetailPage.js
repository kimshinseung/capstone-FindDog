/**
 * ./src/components/page/miss/DetailPage.js
 * 상세 페이지
 */

import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase';

export const DetailPage = (props) => {
    let no = useParams();
    //console.dir(no);

    const navigate = useNavigate();

    const back = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    //console.log(props.data[no.id]);

    return (
        <>
        <h2>상세 페이지</h2>
        <p>게시글 번호: {no.id}</p>
        <img src={`images/missfind${no.id}.jpg`} />
        <h4>이름: {props.data[no.id-1].name} </h4>
        <p>실종위치: {props.data[no.id-1].missedplace}</p>
        <br/>
        <button onClick={back}>뒤로가기</button>
        </>
    );
}