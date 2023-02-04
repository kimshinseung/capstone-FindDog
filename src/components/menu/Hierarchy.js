/**
 * ./src/components/Hierarchy.js
 * 
 * path 계층 정의
 */

// import Route, Routes, Navigate
import {Route, Routes, Navigate} from 'react-router-dom';
// import components
import {
  Miss, Find, Hospital, Search, Notfound, 
  MissSub1, MissSub2, MissSub3,
  FindSub1, FindSub2, FindSub3,
  HospitalSub1, HospitalSub2, HospitalSub3,
  SearchSub1, SearchSub2, SearchSub3,
  Login
  } from "../page/Pages";

// path 정의
const Hierarchy = () => (
    <>
    <Routes>
      <Route exact path='/' element={<Navigate replace='true' to='/miss' />} />

      <Route path="/miss/*" element={<Miss />}>
        <Route path="" element={<MissSub1 />} />
        <Route path="misssub1" element={<MissSub1 />} />
        <Route path="misssub2" element={<MissSub2 />} />
        <Route path="misssub3" element={<MissSub3 />} />
      </Route>

      <Route path="/find/*" element={<Find />}>
        <Route path="" element={<FindSub1 />} />
        <Route path="findsub1" element={<FindSub1 />} />
        <Route path="findsub2" element={<FindSub2 />} />
        <Route path="findsub3" element={<FindSub3 />} />
      </Route>

      <Route path="/hospital/*" element={<Hospital />}>
        <Route path="" element={<HospitalSub1 />} />
        <Route path="hospitalsub1" element={<HospitalSub1 />} />
        <Route path="hospitalsub2" element={<HospitalSub2 />} />
        <Route path="hospitalsub3" element={<HospitalSub3 />} />
      </Route>

      <Route path="/search/*" element={<Search />}>
        <Route path="" element={<SearchSub1 />} />
        <Route path="searchsub1" element={<SearchSub1 />} />
        <Route path="searchsub2" element={<SearchSub2 />} />
        <Route path="searchsub3" element={<SearchSub3 />} />
      </Route>


      <Route path='/misssub1' element={<Navigate replace='true' to='miss/misssub1' />} />
      <Route path='/misssub2' element={<Navigate replace='true' to='miss/misssub2' />} />
      <Route path='/misssub3' element={<Navigate replace='true' to='miss/misssub3' />} />

      <Route path="/findsub1" element={<Navigate replace="true" to="find/findsub1" />} />
      <Route path="/findsub2" element={<Navigate replace="true" to="find/findsub2" />} />
      <Route path="/findsub3" element={<Navigate replace="true" to="find/findsub3" />} />

      <Route path="/hospitalsub1" element={<Navigate replace="true" to="hospital/hospitalsub1" />} />
      <Route path="/hospitalsub2" element={<Navigate replace="true" to="hospital/hospitalsub2" />} />
      <Route path="/hospitalsub3" element={<Navigate replace="true" to="hospital/hospitalsub3" />} />

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