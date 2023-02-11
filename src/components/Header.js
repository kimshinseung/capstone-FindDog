/**
 * ./src/components/Header.js
 */

// import
import { Link } from 'react-router-dom';

// Header
const Header = () => {
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
                <Link to="/login">
                    <img className='header-profile' src='images/user.png' />
                </Link>
            </div>
        </div>
    )
}

// export this component
export default Header;