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
  background: 'white'
};

// 상위 카테고리 메뉴
export const MainMenu = () => {
  return (
    <nav className="main-menu">
      <NavLink to="/miss" style={({ isActive }) => isActive ? activeStyle : undefined}>실종</NavLink>
      <NavLink to="/find" style={({ isActive }) => isActive ? activeStyle : undefined}>목격</NavLink>
      <NavLink to="/hospital" style={({ isActive }) => isActive ? activeStyle : undefined}>보호소 및 동물병원</NavLink>
      <NavLink to="/search" style={({ isActive }) => isActive ? activeStyle : undefined}>검색</NavLink>
      <NavLink to="/review" style={({ isActive }) => isActive ? activeStyle : undefined}>후기</NavLink>
    </nav>
  )
};

// 마이페이지 메뉴
export const MyMenu = () => {
  return (
    <nav className='my-menu'>
      <li><NavLink to='/mypage'>INFORMATION</NavLink></li>
      <li><NavLink to='/mypage/post'>POST</NavLink></li>
    </nav>
  )
};