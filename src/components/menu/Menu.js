/**
 * ./src/components/menu/Menu.js
 * 메뉴
 */

// import
import { NavLink } from 'react-router-dom';
import React from 'react';
// import css
import '../../style/style.css';

// 상위 카테고리 메뉴
export const MainMenu = () => (
  <nav className="main-menu">
    <NavLink to="/miss">실종</NavLink>
    <NavLink to="/find">목격</NavLink>
    <NavLink to="/hospital">보호소 및 동물병원</NavLink>
    <NavLink to="/search">검색</NavLink>
  </nav>
);

// 검색 메뉴
export const SearchMenu = () => (
  <div className="search-menu">
    <li><NavLink to="/search">SUB1</NavLink></li>
    <li><NavLink to="/search/searchsub2">SUB2</NavLink></li>
    <li><NavLink to="/search/searchsub3">SUB3</NavLink></li>
  </div>
);