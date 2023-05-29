/**
 * ./src/components/page/search/SearchPage.js
 * 검색 게시판
 */

//아예 specify,gender,farcolor을 carousel함수로 보내서 거기서 검색조건 처리하게 하기
import React, { useEffect } from "react";
import { db, storage } from "../../../firebase";
import { getDoc, getDocs, collection, updateDoc, addDoc, query, where, orderBy, QuerySnapshot, doc, and, or } from "firebase/firestore";
import { useState } from 'react';
import Post from "./Post";
import { post } from "jquery";
//import userInputs from "../miss/formData.js";
import "./SearchPage.scss";


const userInputs = [
    {
        id: "specify",
        label: "품종",
        datas: ["말티즈", "푸들", "포메라니안", "슈나우저", "믹스"]
    },
    {
        id: "gender",
        label: "성별",
        datas: ["수컷", "암컷"]
    },
    {
        id: "farColor",
        label: "모색",
        datas: ["검은색", "갈색", "하얀색", "회색"]
    }
]



export function SearchPage() {

    useEffect(() => {
        //Search();
    }, []);

    const [postdata, setpost] = useState(new Map());

    const find = async (division, con, farCol) => {
        var q;
        let coll = collection(db, division);

        //switch문에서 case3을 없애고 각 케이스에서 farColor가 지정된게 있나 확인하고 경우에따라 쿼리를 생성하는식으로?

        // switch(con.length){
        //     case 0:
        //         q = query(collection(db, division), where("visibled", "==", true));    break;
        //     case 1:
        //         q = query(collection(db, division), where("visibled", "==", true), where(con[0].label, "==", con[0].data));    break;
        //     case 2:
        //         q = query(collection(db, division), where("visibled", "==", true)
        //             , where(con[0].label, "==", con[0].data), where(con[1].label, "==", con[1].data));   break;
        //     case 3:
        //         q = query(collection(db, division), where("visibled", "==", true)
        //             , where(con[0].label, "==", con[0].data), where(con[1].label, "==", con[1].data), where(con[2].label, "==", con[2].data));  break;
        // }
        console.log(farCol);
        switch(con.length){
            case 0:
                if(farCol){
                    q = query(coll, and(where("visibled", "==", true), and(or(where("farColor1", "==", farCol), where("farColor2", "==", farCol)))));
                } else{
                    q = query(coll, where("visibled", "==", true));
                }
                break;
            case 1:
                if(farCol){
                    q = query(coll, and(where("visibled", "==", true), where(con[0].label, "==", con[0].data), and(or(where("farColor1", "==", farCol), where("farColor2", "==", farCol)))));  
                } else{
                    q = query(coll, where("visibled", "==", true), where(con[0].label, "==", con[0].data));  
                }
                break;
                
            case 2:
                if(farCol){
                    q = query(coll, and(where("visibled", "==", true), where(con[0].label, "==", con[0].data), where(con[1].label, "==", con[1].data), and(or(where("farColor1", "==", farCol), where("farColor2", "==", farCol))))); 
                } else{
                    q = query(coll, where("visibled", "==", true), where(con[0].label, "==", con[0].data), where(con[1].label, "==", con[1].data)); 
                }
                break;
  break;
        }

        Show(q);
    }

    //게시물들 데이터값들 보내줌
    const Show = async (q) => { 
        const QuerySnapshot = await getDocs(q);
        //console.log(QuerySnapshot.docs);
        const data = QuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        //console.log(data);
        setpost(data); //postdata값을 세팅시켜줌.
    }

    const Search = () => {

        let division = document.querySelector("#Division").value;
        if(division == "ㅡㅡㅡㅡㅡ"){
            alert("실종 | 목격 검색조건을 선택해주세요");
            return 0;
        }

        var constraints = [];   //조건을 지정한 필드들만 배열에 넣어서 전달해줌
        var index = 0;
        var farCol;

        let element = document.querySelector("#specify").value;
        if(element != "ㅡㅡㅡㅡㅡ"){
            constraints[index++] = {label:"specify", data:element}; //배열에 조건 이름과 값을 객체로 만들어서 추가
        }
        
        element = document.querySelector("#gender").value;
        if(element != "ㅡㅡㅡㅡㅡ"){
            constraints[index++] = {label:"gender", data:element};
        }
        
        element = document.querySelector("#farColor").value;
        if(element != "ㅡㅡㅡㅡㅡ"){
            //constraints[index++] = {label:"farColor", data:element};
            farCol = element;
        }
        
        find(division, constraints, farCol);
    };



    return <>
        <div className="search-page">
            <h2>검색 게시판</h2>
            <div className='selectBox'>
                <div className='division2'>
                <h4>분류</h4>
                <select id="Division">
                    <option disabled selected>ㅡㅡㅡㅡㅡ</option>
                    <option value="Missing">실종</option>
                    <option value="Finding">목격</option>
                </select>
                </div>

                {userInputs.map((input)=>(
                    <div className={input.id + "2"}>
                        <h4>{input.label}</h4>
                        <select id={input.id}>
                            <option selected>ㅡㅡㅡㅡㅡ</option>
                            {input.datas.map((item)=>(
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                ))} 

            </div>

            <button className="searchButton" onClick={() => { Search() }}>
                검색
            </button>

            <hr/>
            <h2>검색 결과</h2>
            <div className="postObj">
                <Post postObj={postdata} />
            </div>
            <br/><br/>
        </div>
    </>

}