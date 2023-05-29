/**
 * ./src/components/menu/Hierarchy.js
 * path 계층 정의
 */

// import Route, Routes, Navigate
import {Route, Routes} from 'react-router-dom';
// import components
import {
  MainBoard, MyInfo, MyPersonalInfo, MyUploadingPost, MyEditInfo,
  MissBoard, MissTimeDetailBoard, MissLocalDetailBoard,
  FindBoard, FindTimeDetailBoard, FindLocalDetailBoard,
  Post, FindMoreInfo, FindMoreInfo2,
  Map, HospitalMap, SeoulMap, Search, Login, Signup, Upload, MoreInfo, MoreInfo2, FindUpload,
  Forum, UploadPostPage, Notfound
  } from "../page/Pages";
import EditMyInfo from '../page/mypage/EditMyInfo';

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
       <Route path='/miss/moreInfo/detail/:id' element={<MissTimeDetailBoard/>} />
       {/* 실종 | 지역 순 상세페이지 */}
       <Route path='/miss/moreInfo2/detail/:id' element={<MissLocalDetailBoard/>} />

      <Route path="/find/*" element={<FindBoard />} />
      <Route path="/find/upload*" element={<FindUpload />} />
      <Route path="/find/moreInfo*" element={<FindMoreInfo />} />
      <Route path="/find/moreInfo/upload*" element={<FindUpload />} />
      <Route path="/find/moreInfo2*" element={<FindMoreInfo2 />} />
      <Route path="/find/moreInfo2/upload*" element={<FindUpload />} />

      {/* 목격 | 시간 순 상세페이지 */}
      <Route path='/find/moreInfo/detail/:id' element={<FindTimeDetailBoard/>} />
      {/* 목격 | 지역 순 상세페이지 */}
      <Route path='/find/moreInfo2/detail/:id' element={<FindLocalDetailBoard/>} />

      <Route path="/map/*" element={<HospitalMap />} >
        <Route path='' element={<HospitalMap/>}/>
      </Route>
      <Route path="map/hospital" element={<HospitalMap />} />
      <Route path="map/seoul" element={<SeoulMap />} />
      

      <Route path="/search/*" element={<Search />} />

      <Route path="/forum/*" element={<Forum />} />
      <Route path="/forum/general" element={<UploadPostPage />} />
      {/* 자유게시판 | 각 게시글 접근 */}
      <Route path="/forum/posting/:id" element={<Post />} />

      {/* 로그인, 회원가입 */}
      <Route path="/login" element={<Login />} />
      <Route path="/login/signup" element={<Signup />} />

      {/* 마이페이지 */}
      <Route path="/mypage/*" element={<MyInfo />}/>
      <Route path='/mypage/edit' element={<EditMyInfo />}/>
      <Route path='/mypage/information' element={<MyPersonalInfo />} />
      <Route path='/mypage/post' element={<MyUploadingPost />} />

      {/* 오류 페이지 */}
      <Route path="*" element={<Notfound />} />
    </Routes>
    </>
);

// export this component
export default Hierarchy;