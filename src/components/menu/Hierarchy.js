/**
 * ./src/components/menu/Hierarchy.js
 * path 계층 정의
 */

// import Route, Routes, Navigate
import {Route, Routes, Navigate} from 'react-router-dom';
// import components
import {
  DetailBoard, MainBoard, MyInfo, MyPersonalInfo, MyUploadingPost, Post,
  MissBoard, FindBoard, HospitalMap, Search, Notfound, Login, Signup, Upload, MoreInfo, MoreInfo2, FindUpload, Forum, General
  } from "../page/Pages";

// path 정의
const Hierarchy = () => (
    <>
    <Routes>
      <Route exact path='/' element={<MainBoard />} />

      <Route path="/miss/*" element={<MissBoard />} />
      <Route path="/miss/upload*" element={<Upload />} />
      <Route path="/miss/moreInfo*" element={<MoreInfo />} />
      <Route path="/miss/moreInfo/upload*" element={<Upload />} />
      <Route path="/miss/moreInfo2*" element={<MoreInfo2 />} />
      <Route path="/miss/moreInfo2/upload*" element={<Upload />} />

       {/* 실종 | 시간 순 상세페이지 */}
       <Route path='/miss/moreInfo/detail/:id' element={<DetailBoard/>} />
       {/* 실종 | 지역 순 상세페이지 */}
       <Route path='/miss/moreInfo2/detail/:id' element={<DetailBoard/>} />

      <Route path="/find/*" element={<FindBoard />} />
      <Route path="/find/upload*" element={<FindUpload />} />
      {/*<Route path="/find/moreInfo*" element={<FindMoreInfo />} />
      <Route path="/find/moreInfo/upload*" element={<FindUpload />} />
      <Route path="/find/moreInfo2*" element={<FindMoreInfo2 />} />
      <Route path="/find/moreInfo2/upload*" element={<FindUpload />} /> */}

      {/* 목격 | 시간 순 상세페이지 */}
      <Route path='/find/moreInfo/detail/:id' element={<DetailBoard/>} />
      {/* 목격 | 지역 순 상세페이지 */}
      <Route path='/find/moreInfo2/detail/:id' element={<DetailBoard/>} />

      <Route path="/hospital/*" element={<HospitalMap />} />
      <Route path="/search/*" element={<Search />} />

      <Route path="/forum/*" element={<Forum />} />
      <Route path="/forum/general" element={<General />} />
      {/* 자유게시판 | 각 게시글 접근 */}
      <Route path="/forum/posting/:id" element={<Post />} />

      <Route path="/login" element={<Login />} />
      <Route path="/login/signup" element={<Signup />} />

      <Route path="/mypage/*" element={<MyInfo />}>
        <Route path='' element={<MyPersonalInfo />} />
        <Route path='information' element={<MyPersonalInfo />} />
        <Route path='post' element={<MyUploadingPost />} />
      </Route>

      <Route path='/information' element={<Navigate replace='true' to='mypage/information' />} />
      <Route path='/post' element={<Navigate replace='true' to='mypage/post' />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
    </>
);

// export this component
export default Hierarchy;