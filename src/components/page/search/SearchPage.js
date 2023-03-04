/**
 * ./src/components/page/search/SearchPage.js
 * 검색 게시판
 */
import React, { useEffect } from "react";
import { db, storage } from "../../../firebase";
import { getDoc, getDocs, collection,updateDoc, addDoc, query, where, orderBy, QuerySnapshot } from "firebase/firestore";
import { async } from "@firebase/util";
import {Col} from 'reactstrap';


export function SearchPage() {
    useEffect(() => {
        Search();
    }, []);
    
    //검색 조건에 맞는 doc id 찾는 함수
    const find = async (specify, gender, farColor) => {
        const q = query(collection(db, "Missing"), where("specify", "==", specify),
            where("gender", "==", gender), where("farColor", "==", farColor)
            );
        
        const QuerySnapshot = await getDocs(q);
        QuerySnapshot.forEach((doc) => {
            let docs= doc.data();// docs에 doc데이터들 다 받아옴
            let str=document.getElementById("Info");
            let url=docs["img"];
            getImage(url);
            //str.innerText+= "\n"+url;
            for(let item in docs){
            str.innerText+=docs[item]+"\r";
            }
            // Show(doc.id);
        })


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
                onClick={() => Search()}>
                검색</button>
                <div>
            <textfield id="Info"></textfield>
            </div>
            {/* <Carousel/> */}
            <img id="Image" src={`images/missfind2.jpg`} width={200} height={200} />        
        </div>
    </>

}