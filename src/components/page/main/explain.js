import React from "react";
import './explain.scss';
import { Link } from "react-router-dom";
import styled from "styled-components"
//import '../../../style/style.css';

const Explain =()=>{
  return(
    <div>
    <table align="right">
      <tr>
        <th> [ 순서 ] </th>
        <th> [ 반려견 실종시 대처방법 ]
          <button className='customBtn' onclick="window.open('http://www.angel.or.kr/missing.php')" >click! 더 많은 정보 확인하기</button></th>
      </tr>
    <tr>
      <td>1. 현장확인</td> 
      <td>실종현장 확인, 실종된장소와 실종된 장소의 부근을 신속히 이동하면서 탐문한다.</td>
    </tr>
    <tr>
      <td>2. 전단지배포</td>
      <td>실종지역에 전단지를 집중배포하며, 가능한 반경 1km까지 배포한다.</td>
    </tr>
    <tr>
      <td>3. 방문확인</td>
      <td>실종장소 주변의 관공서, 경찰서, 동물병원, 보호소 등을 방문해서 확인후 전단지를 전달한다.</td>
    </tr>
    <tr>
      <td>4. 인터넷활용</td>
      <td>동물보호센터, 파인드독과 같은 실종 웹사이트에 실종신고를 해두고, 구조및 보호 신고를 확인한다. 유기동물공고를 매일 확인한다.</td>
    </tr>
    <tr>
      <td>5. 원점에서 재점검 </td>
      <td>주변을 겉돌거나 같은 지역을 계속 반복하지말고 원점에서 다시 점검한다. 점차 점검지역을 더 확대한다.</td>
    </tr>
    </table>
    </div>
  );
};

export default Explain;