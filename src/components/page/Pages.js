/**
 * ex11
 * ./src/components/Pages.js
 * 
 * 각 메뉴가 담당하는 페이지 담기
 */

// import
import { useLocation, Outlet } from "react-router-dom";
import { MainMenu, MissMenu, FindMenu, HospitalMenu, SearchMenu } from "../menu/Menu";


// Page Template
const PageTemplate = ({ children }) => (
  <div className="page">
    <MainMenu />
    {children}
  </div>
);

// 실종 메뉴
export const Miss = () => (
  <PageTemplate>
    <section>
      <MissMenu />
      <Outlet />
    </section>
  </PageTemplate>
);

export const MissSub1 = () => (
  <div>
    <h3>실종/SUB1</h3>
  </div>
);

export const MissSub2 = () => (
  <div>
    <h3>실종/SUB2</h3>
  </div>
);

export const MissSub3 = () => (
  <div>
    <h3>실종/SUB3</h3>
  </div>
);

// 목격 메뉴
 export const Find = () => (
  <PageTemplate>
    <section>
      <FindMenu />
      <Outlet />
    </section>
  </PageTemplate>
);

export const FindSub1 = () => (
  <div>
    <h3>목격/SUB1</h3>
  </div>
);

export const FindSub2 = () => (
  <div>
    <h3>목격/SUB2</h3>
  </div>
);

export const FindSub3 = () => (
  <div>
    <h3>목격/SUB3</h3>
  </div>
);

// 보호소 및 동물병원 메뉴
 export const Hospital = () => (
  <PageTemplate>
    <section>
      <HospitalMenu />
      <Outlet />
    </section>
  </PageTemplate>
);

export const HospitalSub1 = () => (
  <div>
    <h3>보호소 및 동물병원/SUB1</h3>
  </div>
);

export const HospitalSub2 = () => (
  <div>
    <h3>보호소 및 동물병원/SUB2</h3>
  </div>
);

export const HospitalSub3 = () => (
  <div>
    <h3>보호소 및 동물병원/SUB3</h3>
  </div>
);

// 검색 메뉴
 export const Search = () => (
  <PageTemplate>
    <section>
      <SearchMenu />
      <Outlet />
    </section>
  </PageTemplate>
);

export const SearchSub1 = () => (
  <div>
    <h3>검색/SUB1</h3>
  </div>
);

export const SearchSub2 = () => (
  <div>
    <h3>검색/SUB2</h3>
  </div>
);

export const SearchSub3 = () => (
  <div>
    <h3>검색/SUB3</h3>
  </div>
);

// 로그인 페이지
export const Login = () => (
  <div>
    <h3>LOGIN</h3>
  </div>
);

// 오류 페이지(404 NOT FOUND)
// 설정되지 않은 경로로 갈 경우 나타남
export const Notfound = () => {
  const locations = useLocation();
  return (
  <div>
    <h1>404 NOT FOUND in {locations.pathname}</h1>
  </div>
  );
};