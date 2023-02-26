/**
 * ./src/components/page/mypage/MyInformation.js
 * 개인정보
 */
import {getAuth, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {app} from '../../../firebase';

export const MyInformation = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        signOut(auth);
        navigate('/');
    }

    const auth = getAuth(); // 현재 사용자 인증 정보 가져오기
    const userInfo = auth.currentUser; // 사용자 정보

    return (
        <>
            <div className="my-information">
                <p>개인정보</p>
                <p>email: {userInfo.email}</p>
                <button onClick={logoutHandler}>로그아웃</button>
            </div>
        </>
    );
};