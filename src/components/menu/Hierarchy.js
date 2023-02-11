/**
 * ./src/components/menu/Hierarchy.js
 * path 계층 정의
 */

// import Route, Routes, Navigate
import {Route, Routes, Navigate} from 'react-router-dom';
// import components
import {
  MissBoard, FindBoard, HospitalMap, Search, Notfound, Login,
  SearchSub1, SearchSub2, SearchSub3,
  } from "../page/Pages";

// path 정의
const Hierarchy = () => (
    <>
    <Routes>
      <Route exact path='/' element={<Navigate replace='true' to='/miss' />} />

      <Route path="/miss/*" element={<MissBoard />} />
      <Route path="/find/*" element={<FindBoard />} />
      <Route path="/hospital/*" element={<HospitalMap />} />

      <Route path="/search/*" element={<Search />}>
        <Route path="" element={<SearchSub1 />} />
        <Route path="searchsub1" element={<SearchSub1 />} />
        <Route path="searchsub2" element={<SearchSub2 />} />
        <Route path="searchsub3" element={<SearchSub3 />} />
      </Route>

      <Route path="/searchsub1" element={<Navigate replace="true" to="/search/searchsub1" />} />
      <Route path="/searchsub2" element={<Navigate replace="true" to="/search/searchsub2" />} />
      <Route path="/searchsub3" element={<Navigate replace="true" to="/search/searchsub3" />} />

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
    </>
);

// export this component
export default Hierarchy;