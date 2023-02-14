/**
 * ./src/components/page/map.js
 */

import React, { useEffect } from "react";


export default function Map() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");

    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };
    //map
    let map = new kakao.maps.Map(container, options);

    // <button id="my_location_button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="getCurrentPosBtn(); z-index: 1;">
    //       내 위치 찾기
    //   </button>

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
		var zoomControl = new kakao.maps.ZoomControl();
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
		 
		
		// 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
		kakao.maps.event.addListener(map, 'zoom_changed', function () {

			// 지도의 현재 레벨을 얻어옵니다
			var level = map.getLevel();
		});
		
		// //커스텀 오버레이 생성
        //  var position = new kakao.maps.LatLng(37.58355, 127.010647);  
        //  var content = '<div class="customoverlay">' +
        //  '<button id="my_location_button"; onclick="getCurrentPosBtn(); z-index: 3;">'+
        //  '<span class="title">현재 위치</span>' +
      	// '</button>'
        //  '</div>'
        //  var currentPos = new kakao.maps.CustomOverlay({
        //      map: map,
        //      position: position,
        //      content: content,
        //      yAnchor: 1 
        //  });
		


		if (navigator.geolocation) {
		
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(function (position) {

				let lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도

				let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치
					message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

				// 마커와 인포윈도우를 표시합니다
				displayMarker(locPosition, message);

			});

		} else { // HTML5의 GeoLocation을 사용할 수 없을때 

			let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
				message = 'geolocation을 사용할수 없습니다..'

			displayMarker(locPosition, message);
		}



    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
		function displayMarker(locPosition, message) {

			// 마커를 생성합니다
			let marker = new kakao.maps.Marker({
				map: map,
				position: locPosition
			});

			let iwContent = message, // 인포윈도우에 표시할 내용
				iwRemoveable = true;

			// 인포윈도우를 생성합니다
			let infowindow = new kakao.maps.InfoWindow({
				content: iwContent,
				removable: iwRemoveable
			});

			// 인포윈도우를 마커위에 표시합니다 
			infowindow.open(map, marker);

			// 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
		}
		
  };
  
  return <>
  <div id="map" style={{ width: "100vw", height: "400px",backgroundColor: '#c8c8c8' }}></div>
  <button
  		onClick={()=>mapscript()}>
	내 위치</button>
  </>
}