/**
 * ./src/components/page/map.js
 */

import "./map.scss";
import React, { useEffect } from "react";
import { shelters, hospitals } from "./data";




export default function Map() {
	useEffect(() => {
		mapscript();
	}, []);



	// 마커 이미지의 이미지 주소입니다
	var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

	const mapscript = () => {
		// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
		var infowindow = new kakao.maps.InfoWindow({zIndex:1});

		let container = document.getElementById("map");
		let options = {
			center: new kakao.maps.LatLng(37.583081848660534, 127.01064788757897),
			level: 4,
		};
		//map 생성
		let map = new kakao.maps.Map(container, options);

		
    	// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
		var zoomControl = new kakao.maps.ZoomControl();
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
		

		// 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
		kakao.maps.event.addListener(map, 'zoom_changed', function () {
			// 지도의 현재 레벨을 얻어옵니다
			var level = map.getLevel();
		});






// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker2(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        //map.setBounds(bounds);
    } 
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker2(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}





		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition( function (position) {

				let lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도

				let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치
					message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다
				
				// 지도에 표시할 원을 생성합니다
				var circle = new kakao.maps.Circle({
					center : new kakao.maps.LatLng(lat, lon),  // 원의 중심좌표 입니다 
					radius: 200, // 미터 단위의 원의 반지름입니다 
					strokeColor: '#769B63;', // 선의 색깔입니다
					strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
					fillColor: '#92c465;', // 채우기 색깔입니다
					fillOpacity: 0.2  // 채우기 불투명도 입니다   
				}); 
				// 지도에 원을 표시합니다 
				circle.setMap(map); 

				var circle = new kakao.maps.Circle({
					center : new kakao.maps.LatLng(lat, lon),  // 원의 중심좌표 입니다 
					radius: 500, // 미터 단위의 원의 반지름입니다 
					strokeColor: '#769B63;', // 선의 색깔입니다
					strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
					fillColor: '#92c465;', // 채우기 색깔입니다
					fillOpacity: 0.15  // 채우기 불투명도 입니다   
				}); 
				circle.setMap(map); 


				var circle = new kakao.maps.Circle({
					center : new kakao.maps.LatLng(lat, lon),  // 원의 중심좌표 입니다 
					radius: 800, // 미터 단위의 원의 반지름입니다 
					strokeColor: '#769B63;', // 선의 색깔입니다
					strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
					fillColor: '#92c465;', // 채우기 색깔입니다
					fillOpacity: 0.1  // 채우기 불투명도 입니다   
				}); 
				circle.setMap(map); 


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

			// 장소 검색 객체를 생성합니다
			var ps = new kakao.maps.services.Places(); 
			var searchOption = {
				location: locPosition,
				radius: 1000,
				//size: 5,
				//level: 4
			};
			// 키워드로 장소를 검색합니다
			ps.keywordSearch('동물병원', placesSearchCB, searchOption); 

			// 인포윈도우를 마커위에 표시합니다 
			infowindow.open(map, marker);

			// 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
		}
		
	};




	return <>
		<div className="map-page">
			<div className="box" id="box1" />
			<div id="map" style={{ width: "1500px", height: "600px", backgroundColor: '#c8c8c8' }}></div>
			<div className="box" id="box2"/>
			<br></br>
			<button onClick={()=>mapscript()}> 내 위치 </button>
		</div>
	</>
}