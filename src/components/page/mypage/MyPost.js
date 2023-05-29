/**
 * ./src/components/page/mypage/MyPost.js
 * 유저 자신이 쓴 글 목록
 */
import {getAuth} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const MyPost = () => {
    const navigate = useNavigate();

    const auth = getAuth(); // 현재 사용자 인증 정보 가져오기
    const userInfo = auth.currentUser; // 사용자 정보

    console.log(userInfo);

    // 내 정보로 이동
    const toInformation = () => {
        navigate('/mypage/information');
    }

    // 내 게시글로 이동
    const toPost = () => {
        navigate('/mypage/post');
    }
    
    return (
        <>
            <div className="my-information">
                <button className='' onClick={toInformation}>내 정보</button>
                <button className='' onClick={toPost}>내 게시글</button>
            <hr/>
                <div className="my-post">               
                <p>🍏 내가 올린 게시글 목록 🍏</p>
                
                

                </div>

            </div>
        </>
    );
};