/**
 * ./src/components/menu/Hierarchy.js
 * path 계층 정의
 */

// import Route, Routes, Navigate
import {Route, Routes, Navigate} from 'react-router-dom';
// import components
import {
  MainBoard, MyInfo, MyPersonalInfo, MyUploadingPost,
  MissBoard, FindBoard, HospitalMap, Search, Review, Notfound, Login, Signup, Upload, MoreInfo, MoreInfo2
  } from "../page/Pages";
import { DetailPage } from '../page/miss/DetailPage';

// path 정의
const Hierarchy = () => (
    <>
    <Routes>
      <Route exact path='/' element={<MainBoard />} />

      <Route path="/miss/*" element={<MissBoard />} />
      <Route path="/miss/uplode*" element={<Upload />} />
      <Route path="/miss/moreInfo*" element={<MoreInfo />} />
      <Route path="/miss/moreInfo2*" element={<MoreInfo2 />} />

      <Route path="/find/*" element={<FindBoard />} />
      <Route path="/hospital/*" element={<HospitalMap />} />
      <Route path="/search/*" element={<Search />} />
      <Route path="/review/*" element={<Review />} />

      <Route path="/login" element={<Login />} />
      <Route path="/login/signup" element={<Signup />} />

      <Route path="/mypage/*" element={<MyInfo />}>
        <Route path='' element={<MyPersonalInfo />} />
        <Route path='information' element={<MyPersonalInfo />} />
        <Route path='post' element={<MyUploadingPost />} />
      </Route>

      <Route path='/information' element={<Navigate replace='true' to='mypage/information' />} />
      <Route path='/post' element={<Navigate replace='true' to='mypage/post' />} />

      {/* 상세페이지 */}
      <Route path='detail/:id' element={<DetailPage />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
    </>
);

// export this component
export default Hierarchy;