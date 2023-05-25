/**
 * ./src/components/page/mypage/MyPost.js
 * 유저 자신이 쓴 글 목록
 */
import {getAuth} from 'firebase/auth';
import {app} from '../../../firebase';

export const MyPost = () => {
    const auth = getAuth(); // 현재 사용자 인증 정보 가져오기
    const userInfo = auth.currentUser; // 사용자 정보
    return (
        <>
            <div className="my-information">
            <hr/>
                <div className="my-post">               
                <p>🍏 내가 올린 게시글 목록 🍏</p>
                </div>  
            </div>
        </>
    );
};