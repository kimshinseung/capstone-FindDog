/**
 * ./src/components/page/mypage/MyPage.js
 * 마이페이지
 */

import {getAuth, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {app} from '../../../firebase';

const auth = getAuth(); // 현재 사용자 인증 정보 가져오기
const user = auth.currentUser; // 사용자 객체

export const MyPage = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        signOut(auth);
        navigate('/');
    }

    return (
        <>
            <div className="main-page">
                <h3>마이 페이지...</h3>
                <button onClick={logoutHandler}>로그아웃</button>
            </div>
        </>
    );
};