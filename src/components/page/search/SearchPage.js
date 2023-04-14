/**
 * ./src/components/page/search/SearchPage.js
 * 검색 게시판
 */

//아예 specify,gender,farcolor을 carousel함수로 보내서 거기서 검색조건 처리하게 하기
import React, { useEffect } from "react";
import { db, storage } from "../../../firebase";
import { getDoc, getDocs, collection, updateDoc, addDoc, query, where, orderBy, QuerySnapshot, doc } from "firebase/firestore";
import { useState } from 'react';
import Post from "./Post";
import { post } from "jquery";



export function SearchPage() {

    useEffect(() => {
        Search();
    }, []);

    const [postdata, setpost] = useState(new Map());
    

    const find = async (division, specify, gender, farColor) => {

        if(division=="MISS"){
            const q = query(collection(db, "Missing"), where("specify", "==", specify),
            where("gender", "==", gender), where("farColor", "==", farColor) );
        Show(q);
        }

        else if(division=="FIND"){
            const q = query(collection(db, "Finding"), where("specify", "==", specify),
            where("gender", "==", gender), where("farColor", "==", farColor) );
        Show(q);
        }
        
    }

    //게시물들 데이터값들 보내줌
    const Show = async (q) => { 
        const QuerySnapshot = await getDocs(q);
        const data = QuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setpost(data); //postdata값을 세팅시켜줌.
    }

    const Search = () => {
        let element = document.querySelector("#specify");
        let specify = element.value;
        let element1 = document.querySelector("#gender");
        let gender = element1.value;
        let element2 = document.querySelector("#farColor");
        let farColor = element2.value;

        let divi = document.querySelector("#Division");
        let division = divi.value;

        find(division,specify, gender, farColor);

    };



    return <>

        <div className="search-page">
            <h2>검색</h2>
            <div className='selectBox'>
                <h3>분류</h3>
            <select id="Division">
                    <option value="MISS">실종</option>
                    <option value="FIND">목격</option>
                </select>


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

                <h3>모색</h3>
                <select id="farColor">
                    <option disabled selected>-------</option>
                    <option value="검은색">검은색</option>
                    <option value="갈색">갈색</option>
                    <option value="하얀색">하얀색</option>
                </select>
            </div>
            <br/>
            <button
                onClick={() => { Search() }}>
                검색</button>
            <br/><br/><hr/>
            <h2>검색 결과</h2>
            <div>
                <Post postObj={postdata} />
            </div>
        </div>
    </>

}