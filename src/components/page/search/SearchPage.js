/**
 * ./src/components/page/search/SearchPage.js
 * 검색 게시판
 */

//아예 specify,gender,farcolor을 carousel함수로 보내서 거기서 검색조건 처리하게 하기
import React, { useEffect } from "react";
import { db, storage } from "../../../firebase";
import { getDoc, getDocs, collection,updateDoc, addDoc, query, where, orderBy, QuerySnapshot, doc } from "firebase/firestore";
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './card';
//import data from './data';



export function SearchPage() {

  let data = [
    {
      id : 0,
      name : "",
      missedplace : ""
    },
  
    {
      id : 1,
      name : "",
      missedplace : ""
    },
  
    {
      id : 2,
      name : "라떼",
      missedplace : "남위례역 앞"
    },
  ]
    let [profiles] = useState(data);

    useEffect(() => {
       Search();
    }, []);
   
    const find = async (specify, gender, farColor) => {
        const q = query(collection(db, "Missing"), where("specify", "==", specify),
            where("gender", "==", gender), where("farColor", "==", farColor)
            );
        
        const QuerySnapshot = await getDocs(q);
        let count=0;
        QuerySnapshot.forEach((doc) => {
            
            let docs= doc.data();// docs에 doc데이터들 다 받아옴
            //let str=document.getElementById("Info");
            //str.innerText+= "\n"+url;
            profiles[count].name=docs["name"];
            console.log(profiles[count].name);
            profiles[count].missedplace=docs["address"];
            console.log(profiles[count].missedplace);
            count++;

        })
        return alert("asd")
    }
    
    //아직 이 함수 못 씀
    //게시물들 찾아주는 함수 만들어야됨
    const Show = async(id) => { //id 받아와서 게시물 생성
        let str=document.getElementById("Info");
        str.innerText=id;
    }

    //파이어베이스 스토리지에서 이미지 가져오기
    const getImage= async(url)=>{
      document.getElementById("Image").src="images/missfind1.jpg";
       
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        }

    const sa =()=>{
      return alert();
    }
    const Search = () => {
        let element = document.querySelector("#specify");
        let specify = element.value;
        let element1 = document.querySelector("#gender");
        let gender = element1.value;
        let element2 = document.querySelector("#farColor");
        let farColor = element2.value;
        
        find(specify, gender, farColor);
        
      };

    
        
    return <>

        <div className="search-page">

            <div className='selectBox'>
                <h3>품종</h3>
                <select id="specify">
                    <option disabled selected>-------</option>
                    <option value="말티즈">말티즈</option>
                    <option value="시바">시바</option>
                    <option value="허스키">허스키</option>
                </select>

                <h3>성별</h3>
                <select id="gender">
                    <option disabled selected>-------</option>
                    <option value="수컷">수컷</option>
                    <option value="암컷">암컷</option>
                    <option value="중성화">중성화</option>
                </select>

                <h3>털색</h3>
                <select id="farColor">
                    <option disabled selected>-------</option>
                    <option value="검은색">검은색</option>
                    <option value="갈색">갈색</option>
                    <option value="하얀색">하얀색</option>
                </select>
            </div>
            <button
                onClick={() => {Search();}}>
                검색</button>
                <div>
            </div>

            <div className="carousel">
            <Slider {...settings}>
              {profiles.map((item, i) => <Card profiles={item} i={i+1} key={item.id} />)}
            </Slider>
        </div>
        </div>
    </>

}