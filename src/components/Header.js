/**
 * ./src/components/Header.js
 */

import { Link } from 'react-router-dom';

// 헤더 정의
const Header = () => {
    return (
        <div className='header'>
            <Link to="/"><h1>FIND DOG(LOGO 삽입)</h1></Link>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Header;