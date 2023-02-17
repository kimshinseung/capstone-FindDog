/**
 * ./src/components/menu/Hierarchy.js
 * path 계층 정의
 */

// import Route, Routes, Navigate
import {Route, Routes, Navigate} from 'react-router-dom';
// import components
import {
  MissBoard, FindBoard, HospitalMap, Search, Notfound, Login, Signup, Upload, MoreInfo
  } from "../page/Pages";

// path 정의
const Hierarchy = () => (
    <>
    <Routes>
      <Route exact path='/' element={<Navigate replace='true' to='/miss' />} />

      <Route path="/miss/*" element={<MissBoard />} />
      <Route path="/miss/uplode*" element={<Upload />} />
      <Route path="/miss/moreInfo*" element={<MoreInfo />} />

      <Route path="/find/*" element={<FindBoard />} />
      <Route path="/hospital/*" element={<HospitalMap />} />
      <Route path="/search/*" element={<Search />} />

      <Route path="/login" element={<Login />} />
      <Route path="/login/signup" element={<Signup />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
    </>
);

// export this component
export default Hierarchy;