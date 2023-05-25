/**
 * ./src/components/page/map.js
 */

import "./map.scss";
import React, { useEffect, useState } from "react";
import { shelters, hospitals } from "./data";
import areas from "./seoulData.js"

import '../../../style/style.css';


/*export default function Map() {
	useEffect(() => {
		mapscript();
	}, []);



	// 마커 이미지의 이미지 주소입니다
	var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

	const mapscript = () => {
		// 마커 이미지의 이미지 주소입니다
		var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

		// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
		var placeOverlay = new kakao.maps.InfoWindow({zIndex:1}),
			contentNode = document.createElement('div'); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
		//contentNode.className = 'placeinfo_wrap';
		addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
		addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);
		placeOverlay.setContent(contentNode);

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


		function addEventHandle(target, type, callback) {
			if (target.addEventListener) {
				target.addEventListener(type, callback);
			} else {
				target.attachEvent('on' + type, callback);
			}
		}




		// 키워드 검색 완료 시 호출되는 콜백함수 입니다
		function placesSearchCB (data, status, pagination) {
			if (status === kakao.maps.services.Status.OK) {

				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가합니다
				var bounds = new kakao.maps.LatLngBounds();

				for (var i=0; i<data.length; i++) {
					displayMarker(data[i]);    
					bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				}       

				// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
				//map.setBounds(bounds);
			} 
		}

		var infowindow = new kakao.maps.InfoWindow({zIndex:1});
		// 지도에 마커를 표시하는 함수입니다
		function displayMarker(place) {

			// 마커 이미지의 이미지 크기 입니다
			var imageSize = new kakao.maps.Size(24, 35); 
    
			// 마커 이미지를 생성합니다    
			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
			
			// 마커를 생성하고 지도에 표시합니다
			var marker = new kakao.maps.Marker({
				image : markerImage, // 마커 이미지 
				map: map,
				position: new kakao.maps.LatLng(place.y, place.x) 
			});


			kakao.maps.event.addListener(marker, 'click', function() {
				var content = '<div class="placeinfo">' +
							'   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   

				if (place.road_address_name) {
					content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
								'  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
				}  else {
					content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
				}                
				content += '    <span class="tel">' + place.phone + '</span>' + 
							'</div>' + 
							'<div class="after"></div>';

				// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
				infowindow.setContent(content);
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
				setLocation(locPosition, message);

			});

		} else { // HTML5의 GeoLocation을 사용할 수 없을때 
			let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
				message = 'geolocation을 사용할수 없습니다..'
				setLocation(locPosition, message);
		}




    	// 지도에 마커와 인포윈도우를 표시하는 함수입니다
		function setLocation(locPosition, message) {
			// 마커를 생성합니다
			let marker = new kakao.maps.Marker({
				map: map,
				position: locPosition
			});

			// let iwContent = message, // 인포윈도우에 표시할 내용
			// 	iwRemoveable = true;

			// // 인포윈도우를 생성합니다
			// let infowindow = new kakao.maps.InfoWindow({
			// 	content: iwContent,
			// 	removable: iwRemoveable
			// });

			// 장소 검색 객체를 생성합니다
			var ps = new kakao.maps.services.Places(); 
			var searchOption = {
				location: locPosition,
				radius: 3000,
				//size: 5,
				//level: 4
			};
			// 키워드로 장소를 검색합니다
			ps.keywordSearch('동물병원', placesSearchCB, searchOption); 

			// 인포윈도우를 마커위에 표시합니다 
			//infowindow.open(map, marker);

			// 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
		}
		
	};




	return <>
		<div className="map-page">
        	<h2>근처 동물병원 및 보호소 찾기</h2>
			<div className="map-section">
				<div className="box" id="box1" />
				<div id="map" style={{ width: "1450px", height: "600px", backgroundColor: '#c8c8c8' }}></div>
				<div className="box" id="box2"/>
				<br></br>
			</div>
		</div>
		<button id="button" onClick={()=>mapscript()}> 내 위치 </button>
	</>
}*/








import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../../firebase";



export default function seoulMap(){
	const [counts, setCounts] = useState([]);

	var plag = true;

	
	// const [counts] = useState(()=>{
	// });



	// const [missingData, setMissingData] = useState([]);
	// const [findingData, setFindingData] = useState([]);

	const [missingData, setMissingData] = useState(async ()=> {
		//console.log("missing들어옴");
		const QuerySnapshot = await getDocs(query(collection(db, "Missing")));
		const data = QuerySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));

		setMissingData(Array.from(data));
		// console.log(Array.from(data));
		// console.log(Array.from(data).length);
		// console.log(missingData.length);
		// console.log(Array.from(missingData).length);
		//Array.from(data);
	});

	const [findingData, setFindingData] = useState(async ()=> {
		//console.log("finding들어옴");
		const QuerySnapshot = await getDocs(query(collection(db, "Finding")));
		const data = QuerySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		setFindingData(Array.from(Array.from(data)));
	});


	useEffect(() => {
		mapscript();
	}, []);




	const getDatas = () => {
		if (plag == false){return 0;}
		for (var i=0, len = areas.length; i<len; i++){
			counts[i] = {name: areas[i]["name"], missingCounts: 0, findingCounts: 0};
			//setCounts([...counts, ]);
			// counts[i]["name"] = areas[i]["name"];
			// counts[i]["missingCounts"] = 0;
			// counts[i]["findingCounts"] = 0;



			// const QuerySnapshot = getDocs(collection(db, "Missing"));
			// const data1 = Array.from(QuerySnapshot).forEach((doc) => ({
			// 	id: doc.id,
			// 	...doc.data()
			// }));
			// setMissingData(data1);

			// const QuerySnapshot2 = getDocs(collection(db, "Finding"));
			// const data2 = Array.from(QuerySnapshot2).forEach((doc) => ({
			// 	id: doc.id,
			// 	...doc.data()
			// }));
			// setFindingData(data2);

			for(var j=0, len = areas.length; j<len; j++){
				var missingStr, findingStr;
				//console.log(Array.from(missingData).length);
				
				if(Array.from(missingData).length > j){
					// console.log("들어옴");
					// console.log(missingData[j]);
					missingStr = missingData[j]["address"].split(" ", 2)[1];
					//console.log("missingStr" + missingStr);
					if(counts[i]["name"] == missingStr){
						counts[i]["missingCounts"] += 1;
					}
				}
				
				if(Array.from(findingData).length > j){
					findingStr = findingData[j]["address"].split(" ", 2)[1];
					//console.log("findingStr" + findingStr);
					if(counts[i]["name"] == findingStr){
						counts[i]["findingCounts"] += 1;
					}
				}
			}
			//console.log(counts);
		}
		plag = false;
	}



	const mapscript = () => {
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = { 
			center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
			level: 8 // 지도의 확대 레벨
		};

		var map = new kakao.maps.Map(mapContainer, mapOption),
			customOverlay = new kakao.maps.CustomOverlay({}),
			infowindow = new kakao.maps.InfoWindow({removable: true});

		// 지도에 영역데이터를 폴리곤으로 표시합니다 
		for (var i = 0, len = areas.length; i < len; i++) {
			displayArea(areas[i]);
		}

		// 다각형을 생상하고 이벤트를 등록하는 함수입니다
		function displayArea(area) {
			// 다각형을 생성합니다 
			var polygon = new kakao.maps.Polygon({
				map: map, // 다각형을 표시할 지도 객체
				path: area.path,
				strokeWeight: 2,
				strokeColor: '#769B63',
				strokeOpacity: 0.8,
				fillColor: '#92c465',
				fillOpacity: 0.2
			});
			//polygon.setMap(map);

			// 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다 
			// 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
			kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
				polygon.setOptions({fillOpacity: 0.5});

				//plag && getDatas();

				var missingNum, findingNum;
				for(var i=0; i<counts.length; i++){
					if(counts[i]["name"] == area.name){
						missingNum = counts[i]["missingCounts"];
						findingNum = counts[i]["findingCounts"];
						break;
					}
				}

				var content = '<div class="area"> <strong>' + area.name + '</strong>'
				+			'	<div class="number"> 실종마리수: ' + missingNum
				+			'	</br> 목격마리수: ' + findingNum + '</div></div>';

				customOverlay.setContent(content);
				customOverlay.setPosition(mouseEvent.latLng); 
				customOverlay.setMap(map);
			});

			// 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다 
			kakao.maps.event.addListener(polygon, 'mousemove', function(mouseEvent) {
				
				customOverlay.setPosition(mouseEvent.latLng); 
			});

			// 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
			// 커스텀 오버레이를 지도에서 제거합니다 
			kakao.maps.event.addListener(polygon, 'mouseout', function() {
				polygon.setOptions({fillOpacity: 0.2});
				customOverlay.setMap(null);
			}); 

			// 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다 
			kakao.maps.event.addListener(polygon, 'click', function(mouseEvent) {
				var content = '<div class="info">' + 
							'   <div class="title">' + area.name + '</div>' +
							'   <div class="size">총 면적 : 약 ' + Math.floor(polygon.getArea()) + ' m<sup>2</sup></div>' +
							'</div>';

				infowindow.setContent(content); 
				infowindow.setPosition(mouseEvent.latLng); 
				infowindow.setMap(map);
			});
		}
	};


	return <>
		<div className="map-page">
        	<h2>주변 실종동물 현황</h2>
			<div className="map-section">
				<div className="box" id="box1" />
				<div id="map" onMouseOver={plag && getDatas()} style={{ width: "1450px", height: "600px", backgroundColor: '#c8c8c8' }}></div>
				<div className="box" id="box2"/>
				<br></br>
			</div>
		</div>
	</>
}
