/**
 * ./src/components/Header.js
 */

// import
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import {getAuth, onAuthStateChanged} from 'firebase/auth';

import {app} from '../firebase';    

const auth = getAuth(); // 현재 사용자 인증 정보 가져오기

// Header
const Header = () => {
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUserState(true);
            } else {
                setUserState(false);
            }
        });
    }, [])

    return (
            <div className='header'>
                <div className='header-text-div'>
                    <h3>파인드독<br/>빠른 실종 반려견 찾기</h3>
                </div>
    
                <div className='header-logo-div'>
                    <Link to="/">
                        <img className='header-logo' src='images/logo_web.png' />
                    </Link>
                </div>
    
                <div className='header-profile-div'>
                    {
                        (userState)
                        ? (<Link to="/mypage"><img className='header-profile' src='images/user.png' /></Link>)
                        : (<Link to="/login"><img className='header-profile' src='images/user.png' /></Link>)
                    }
                    
                </div>
            </div>
        )
}

// export this component
export default Header;