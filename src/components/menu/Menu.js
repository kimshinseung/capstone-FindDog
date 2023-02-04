/**
 * ./src/components/Menu.js
 * 
 * 메뉴
 */

// import
import { NavLink } from 'react-router-dom';
import React from 'react';

import '../../style/style.css';
import DropdownHook from './DropdownHook';

// 상위 카테고리 메뉴
export const MainMenu = () => (
  <nav className="main-menu">
    <NavLink to="/miss">실종</NavLink>
    <NavLink to="/find">목격</NavLink>
    <NavLink to="/hospital">보호소 및 동물병원</NavLink>
    <NavLink to="/search">검색</NavLink>
  </nav>
);

// 실종 메뉴
export const MissMenu = () => {
  const [missIsOpen, missRef, missHandler] = DropdownHook(false);
  return (
    <>
    <div className="miss-menu">
      <li><NavLink to="/miss">SUB1</NavLink></li>
      <li><NavLink to="/miss/misssub2">SUB2</NavLink></li>
      <li><NavLink to="/miss/misssub3">SUB3</NavLink></li>
    </div>
    </>
  )
};

// 목격 메뉴
export const FindMenu = () => (
  <div className="find-menu">
    <li><NavLink to="/find">SUB1</NavLink></li>
    <li><NavLink to="/find/findsub2">SUB2</NavLink></li>
    <li><NavLink to="/find/findsub3">SUB3</NavLink></li>
  </div>
);

// 보호소 및 동물병원 메뉴
export const HospitalMenu = () => (
  <div className="hospital-menu">
    <li><NavLink to="/hospital">SUB1</NavLink></li>
    <li><NavLink to="/hospital/hospitalsub2">SUB2</NavLink></li>
    <li><NavLink to="/hospital/hospitalsub3">SUB3</NavLink></li>
  </div>
);

// 검색 메뉴
export const SearchMenu = () => (
  <div className="search-menu">
    <li><NavLink to="/search">SUB1</NavLink></li>
    <li><NavLink to="/search/searchsub2">SUB2</NavLink></li>
    <li><NavLink to="/search/searchsub3">SUB3</NavLink></li>
  </div>
);

// 음...
export const DropdownMenu = () => {
  const [boardIsOpen, boardRef, boardHandler] = DropdownHook(false);

  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownButton onClick={boardHandler} ref={boardRef}>
          board
        </DropdownButton>
        <Menu isDropped={boardIsOpen}>
          <Ul>
            <Li>
              <LinkWrapper>1</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper>2</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper>3</LinkWrapper>
            </Li>
          </Ul>
        </Menu>
      </DropdownContainer>
    </Wrapper>
  )
};