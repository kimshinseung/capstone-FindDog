/**
 * ./src/components/page/mypage/MyPost.js
 * 유저 자신이 쓴 글 목록
 */
import {getAuth} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../../../style/style.css';
import './mypage.scss';

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
            <div className="my-post">
                <div className='my-information-to-btn'>
                    <button className='myInfo-toInfo' onClick={toInformation}>내 정보</button>
                    <button className='myInfo-toPost' onClick={toPost}>내 게시글</button>
                </div>
                <hr/>

                <div className='my-post-page2'>
                    <div className="my-post-title">
                        <p>🍏 내가 올린 게시글 🍏</p>
                    </div>
                <div className="my-post-page3">
                
                </div>
                    <table>
                        <th>제목</th>
                        <th>작성일</th>
                        <tr>

                        </tr>
                    </table>
                </div>
            </div>
        </>
    );
};