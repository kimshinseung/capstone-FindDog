/**
 * ./src/components/page/miss/DetailPage.js
 * 상세 페이지
 */

import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase';

export const DetailPage = (props) => {
    let {id} = useParams();
    console.log(id)

    const navigate = useNavigate();

    const back = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <>
        <h2>상세 페이지입니다.</h2>
        <p>ID: {id}</p>
        <br/>
        <button onClick={back}>뒤로가기</button>
        </>
    );
}