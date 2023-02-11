/**
 * ./src/components/page/Pages.js
 * 
 * 각 메뉴가 담당하는 페이지
 */

// import
import { useLocation, Outlet } from "react-router-dom";
import { MainMenu, SearchMenu } from "../menu/Menu";
// import
import {FindPage} from './find/FindPage';
import {MissPage} from './miss/MissPage';
import {SearchPage} from './search/SearchPage';
import LoginPage  from "./Login/LoginPage";
import Map from "../map";
// import
import '../../style/style.css';

// Page Template
const PageTemplate = ({ children }) => (
  <div className="page">
    <MainMenu />
    {children}
  </div>
);

/**
 * MissBoard
 * 실종 게시판
 * 하위 메뉴 없음
 * 사용자의 실종 반려견을 올릴 수 있는 게시판 페이지
 */
export const MissBoard = () => (
  <PageTemplate>
    <section className="miss-board">
      <MissPage />
    </section>
  </PageTemplate>
);

/**
 * FindBoard
 * 목격 게시판
 * 하위 메뉴 없음
 * 사용자가 목격담을 올릴 수 있는 게시판 페이지
 */
export const FindBoard = () => (
  <PageTemplate>
    <section className="find-board">
      <FindPage />
    </section>
  </PageTemplate>
);

/**
 * HospitalMap
 * 보호소 및 동물병원
 * 하위 메뉴 없음
 * 사용자의 위치 근처에 있는 보호소와 동물병원을 표시해주는 지도 페이지
 */
export const HospitalMap = () => (
  <PageTemplate>
    <section className="hospital-map">
      <div>
        <h3>근처 동물병원 및 보호소 찾기</h3>
      </div>
      <Map />
    </section>
  </PageTemplate>
);

// 검색 메뉴
export const Search = () => (
  <PageTemplate>
    <section className="search-board">
      <SearchPage />
    </section>
  </PageTemplate>
);

// 로그인 페이지
export const Login = () => (
  <div className="login-page">
    <h3>LOGIN</h3>
    <LoginPage/>
  </div>
);

// 오류 페이지(404 NOT FOUND)
// 설정되지 않은 경로로 갈 경우 나타남
export const Notfound = () => {
  const locations = useLocation();
  return (
  <div>
    <h1>404 NOT FOUND in {locations.pathname}</h1>
    <hr/>
    <p>경로가 잘못되었습니다. 주소를 다시 확인해주세요.</p>
  </div>
  );
};