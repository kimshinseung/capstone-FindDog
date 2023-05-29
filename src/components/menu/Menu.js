/**
 * ./src/components/menu/Menu.js
 * 메뉴
 */

// import
import { NavLink } from 'react-router-dom';
import React from 'react';
// import css
import '../../style/style.css';

// 메뉴 클릭 시 스타일 변경
const activeStyle = {
  //color: '#40643b',
  fontWeight: '750',
  textDecorationLine: 'underline',
  textUnderlinePosition : 'under',
  textDecorationThickness: '2.5px',
  textDecorationColor: '#69a65f',

  //border: '#69a65f'
  //background: "white"
};

// 상위 카테고리 메뉴
export const MainMenu = () => {
  return (
    <nav className="main-menu">
      <NavLink className="missMenu" to="/miss" style={({ isActive }) => isActive ? activeStyle : undefined}>실종</NavLink>
      <NavLink className="findMenu" to="/find" style={({ isActive }) => isActive ? activeStyle : undefined}>목격</NavLink>
      <NavLink className="hospitalMenu" to="/hospital" style={({ isActive }) => isActive ? activeStyle : undefined}>보호소 및 동물병원</NavLink>
      <NavLink className="searchMenu" to="/search" style={({ isActive }) => isActive ? activeStyle : undefined}>검색</NavLink>
      <NavLink className="forumMenu" to="/forum" style={({ isActive }) => isActive ? activeStyle : undefined}>자유게시판</NavLink>
    </nav>
  )
};

// // 마이페이지 메뉴
// export const MyMenu = () => {
//   return (
//     <nav className='my-menu'>
//       <br/>
//       <li><NavLink to='/mypage'>INFORMATION</NavLink></li>
//       <li><NavLink to='/mypage/post'>POST</NavLink></li>
//       <br/>
//     </nav>
//   )
// };