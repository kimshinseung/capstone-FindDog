/**
 * ./src/components/page/Pages.js
 * 
 * 각 메뉴가 담당하는 페이지
 */

// import
import { useLocation, Outlet } from "react-router-dom";
import { MainMenu, SearchMenu, MyMenu } from "../menu/Menu";
// import
import {FindPage} from './find/FindPage';
import {MissPage} from './miss/MissPage';
import {SearchPage} from './search/SearchPage';
import {ReviewPage} from './review/ReviewPage';
import {MainPage} from './main/MainPage';
import { MyInformation } from "./mypage/MyInformation";
import { MyPost } from "./mypage/MyPost";
import LoginPage  from "./Login/LoginPage";
import SignupPage from "./Login/SignupPage";
import UploadPage from "./miss/UploadPage";
import MoreinfoPage from "./miss/moreInfo";
import Moreinfo2Page from "./miss/moreInfo2";
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
 * MainBoard
 * 메인 페이지
 */
export const MainBoard = () => (
  <PageTemplate>
    <section className="main-board">
      <MainPage />
    </section>
  </PageTemplate>
)

/**
 * MyInfo
 * 마이 페이지
 */
export const MyInfo = () => (
  <PageTemplate>
    <section className="my-info">
      <MyMenu />
      <Outlet />
    </section>
  </PageTemplate>
)

export const MyPersonalInfo = () => (
  <MyInformation />
)

export const MyUploadingPost = () => (
  <MyPost />
)

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

export const Upload = () => (
  <PageTemplate>
    <section className="upload-page">
      <UploadPage />
    </section>
  </PageTemplate>
)

export const MoreInfo = () => (
  <PageTemplate>
    <section className="moreinfo-page">
      <MoreinfoPage />
    </section>
  </PageTemplate>
)

export const MoreInfo2 = () => (
  <PageTemplate>
    <section className="moreinfo2-page">
      <Moreinfo2Page />
    </section>
  </PageTemplate>
)


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

// 후기게시판
export const Review = () => (
  <PageTemplate>
    <section className="review-board">
      <ReviewPage />
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

// 회원가입 페이지
export const Signup = () => (
  <div className="signup-page">
    <h3>회원가입</h3>
    <SignupPage/>
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