/**
 * ./src/components/page/Pages.js
 * 
 * 각 메뉴가 담당하는 페이지
 */

// import
import { useLocation, Outlet } from "react-router-dom";
import { MainMenu, MyMenu } from "../menu/Menu";
// import
import {FindPage} from './find/FindPage';
import {MissPage} from './miss/MissPage';
import {SearchPage} from './search/SearchPage';
import {ForumPage} from './forum/ForumPage';
import {MainPage} from './main/MainPage';
import { MyInformation } from "./mypage/MyInformation";
import { MyPost } from "./mypage/MyPost";
import LoginPage  from "./Login/LoginPage";
import SignupPage from "./Login/SignupPage";
import UploadPage from "./miss/UploadPage";
import MoreinfoPage from "./miss/moreInfo";
import Moreinfo2Page from "./miss/moreInfo2";
import FindUploadPage from "./find/FindUploadPage";
import FindMoreinfoPage from "./find/FindMoreInfo";
import FindMoreinfo2Page from "./find/FindMoreInfo2";
import {DetailPage} from "./miss/DetailPage";
import Map from "./map/map";
// import
import '../../style/style.css';
import { UploadPost } from "./forum/UploadPost";
import {PostPage} from "./forum/PostPage";


// Page Template
const PageTemplate = ({ children }) => (
  <div className="page">
    <MainMenu />
    {children}
  </div>
);

/**
 * Detail
 * 상세 페이지
 */
export const MissTimeDetailBoard = () => (
  <PageTemplate>
    <section className="detail-board">
      <DetailPage cg="Missing" cg2="time"/>
    </section>
  </PageTemplate>
)

export const MissLocalDetailBoard = () => (
  <PageTemplate>
    <section className="detail-board">
      <DetailPage cg="Missing" cg2="local"/>
    </section>
  </PageTemplate>
)

export const FindTimeDetailBoard = () => (
  <PageTemplate>
    <section className="detail-board">
      <DetailPage cg="Finding" cg2="time"/>
    </section>
  </PageTemplate>
)

export const FindLocalDetailBoard = () => (
  <PageTemplate>
    <section className="detail-board">
      <DetailPage cg="Finding" cg2="local"/>
    </section>
  </PageTemplate>
)

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
    <section className="upload-board">
      <UploadPage />
    </section>
  </PageTemplate>
)

export const MoreInfo = () => (
  <PageTemplate>
    <section className="moreinfo-board">
      <MoreinfoPage />
    </section>
  </PageTemplate>
)

export const MoreInfo2 = () => (
  <PageTemplate>
    <section className="moreinfo2-board">
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

export const FindUpload = () => (
  <PageTemplate>
    <section className="find-upload-page">
      <FindUploadPage />
    </section>
  </PageTemplate>
)

export const FindMoreInfo = () => (
  <PageTemplate>
    <section className="moreinfo-board">
      <FindMoreinfoPage />
    </section>
  </PageTemplate>
)

export const FindMoreInfo2 = () => (
  <PageTemplate>
    <section className="moreinfo2-board">
      <FindMoreinfo2Page />
    </section>
  </PageTemplate>
)

/**
 * HospitalMap
 * 보호소 및 동물병원
 * 하위 메뉴 없음
 * 사용자의 위치 근처에 있는 보호소와 동물병원을 표시해주는 지도 페이지
 */
export const HospitalMap = () => (
  <PageTemplate>
    <section className="hospital-map">
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

// 자유게시판
export const Forum = () => (
  <PageTemplate>
    <section className="forum-board">
      <ForumPage />
    </section>
  </PageTemplate>
);

export const General = () => (
  <PageTemplate>
    <section className="genaral-page">
      <UploadPost />
    </section>
  </PageTemplate>
)

export const Post = () => (
  <PageTemplate>
    <section className="post-page">
      <PostPage />
    </section>
  </PageTemplate>
)

// 로그인 페이지
export const Login = () => (
  <div className="login-page">
    <LoginPage/>
  </div>
);

// 회원가입 페이지
export const Signup = () => (
  <div className="signup-page">
    <h2>회원가입</h2>
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