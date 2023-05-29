// /**
//  * ./src/components/page/search/SearchPage.js
//  * 검색 게시판
//  */

// //아예 specify,gender,farcolor을 carousel함수로 보내서 거기서 검색조건 처리하게 하기
// import React, { useEffect } from "react";
// import { db, storage } from "../../../firebase";
// import { getDoc, getDocs, collection, updateDoc, addDoc, query, where, orderBy, QuerySnapshot, doc } from "firebase/firestore";
// import { useState } from 'react';
// import Post from "./Post";
// import { post } from "jquery";
// import userInputs from "../miss/formData.js";
// import "./SearchPage.scss";



// export function SearchPage() {
//     var [specify, setSpecify] = useState([]);
//     var [gender, setGender] = useState([]);
//     var [farColor, setFarColor] = useState([]);


//     useEffect(() => {
//         //Search();
        
//     }, []);

    
//     const [postdata, setpost] = useState(new Map());

//     const find = async (division) => {
//         const q = query(collection(db, division), where("specify", "in", specify));
//         const QuerySnapshot = await getDocs(q);
//         var documents = QuerySnapshot.docs.filter((doc) => {
//             for(var i=0; i<gender.length; i++){
//                 if(doc.gender == gender[i]) return true;
//             }
//             return false;
//         })

//         documents = documents.filter((doc)=>{
//             for(var i=0; i<farColor.length; i++){
//                 if(doc.farColor1 == gender[i] || doc.farColor2 == gender[i])
//                     return true;
//             }
//             return false;
//         })

//         const data = documents.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         setpost(data);

//     }

//     //게시물들 데이터값들 보내줌
//     const Show = async (q) => { 
//         const QuerySnapshot = await getDocs(q);
//         const data = QuerySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         setpost(data); //postdata값을 세팅시켜줌.
//     }

//     const Search = () => {

//         setSpecify([]);
//         setGender([]);
//         setFarColor([]);
//         console.log(specify);
//         console.log(gender);
//         console.log(farColor);

//         var element = document.querySelector("#specify").value;
//         if(element == "ㅡㅡㅡㅡㅡ"){
//             let arr = userInputs[0].datas;
//             for(var i=0; i<arr.length; i++){
//                 specify[i] = arr[i];
//             }
//         }
//         else{
//             setSpecify([...specify, element.value]);
//         }
        

//         element = document.querySelector("#gender").value;
//         if(element == "ㅡㅡㅡㅡㅡ"){
//             let arr = userInputs[1].datas;
//             for(var i=0; i<arr.length; i++){
//                 gender[i] = arr[i];
//             }
//         }
//         else{
//             setGender([...gender, element.value]);
//         }
        
//         element = document.querySelector("#farColor1").value;
//         if(element == "ㅡㅡㅡㅡㅡ"){
//             let arr = userInputs[2].datas;
//             for(var i=0; i<arr.length; i++){
//                 farColor[i] = arr[i];
//             }
//         }
//         else{
//             setFarColor([...farColor, element.value]);
//         }

//         element = document.querySelector("#farColor2").value;
//         if(element == "ㅡㅡㅡㅡㅡ"){
//             let arr = userInputs[2].datas;
//             for(var i=0; i<arr.length; i++){
//                 farColor[i] = arr[i];
//             }
//         }
//         else{
//             setFarColor([...farColor, element.value]);  //farcolor1,2 동일하면 해당 색만 배열에 넣도록?
//         }

//         console.log(specify);
//         console.log(gender);
//         console.log(farColor);

//         let divi = document.querySelector("#Division");
//         let division = divi.value;

//         //find(division,specify, gender, farColor);
//         find(division);

//     };



//     return <>
//         <div className="search-page">
//             <h2>검색 게시판</h2>
//             <div className='selectBox'>
//                 <div className='division2'>
//                 <h4>분류</h4>
//                 <select id="Division">
//                     <option disabled selected>ㅡㅡㅡㅡㅡ</option>
//                     <option value="Missing">실종</option>
//                     <option value="Finding">목격</option>
//                 </select>
//                 </div>


//                 {userInputs.map((input)=>(
//                     <div className={input.id + "2"}>
//                         <h4>{input.label}</h4>
//                         <select id={input.id}>
//                             <option selected>ㅡㅡㅡㅡㅡ</option>
//                             {input.datas.map((item)=>(
//                                 <option value={item} key={item}>{item}</option>
//                             ))}
//                         </select>
//                     </div>
//                 ))} 

//             </div>

//             <button className="searchButton" onClick={() => { Search() }}>
//                 검색
//             </button>

//             <hr/>
//             <h2>검색 결과</h2>
//             <div className="postObj">
//                 <Post postObj={postdata} />
//             </div>
//             <br/><br/>
//         </div>
//     </>

// }











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

    const find = async (division, con) => {
        var q;
        switch(con.length){
            case 0:
                q = query(collection(db, division));
                break;
            case 1:
                q = query(collection(db, division), where(con[0].label, "==", con[0].data));
                break;
            case 2:
                q = query(collection(db, division), where(con[0].label, "==", con[0].data), where(con[1].id, "==", con[1].data));
                break;
            case 3:
                q = query(collection(db, division), where(con[0].label, "==", con[0].data), where(con[1].id, "==", con[1].data), where(con[2].id, "==", con[2].data));
                break;
        }
        Show(q);
    }

    //게시물들 데이터값들 보내줌
    const Show = async (q) => { 
        const QuerySnapshot = await getDocs(q);
        console.log(QuerySnapshot.docs);
        const data = QuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(data);
        setpost(data); //postdata값을 세팅시켜줌.
    }

    const Search = () => {
        var constraints = [];
        var index = 0;

        let element = document.querySelector("#specify").value;
        if(element != "ㅡㅡㅡㅡㅡ"){
            constraints[index++] = {label:"specify", data:element};
        }
        
        element = document.querySelector("#gender").value;
        if(element != "ㅡㅡㅡㅡㅡ"){
            constraints[index++] = {label:"gender", data:element};
        }
        
        element = document.querySelector("#farColor").value;
        if(element != "ㅡㅡㅡㅡㅡ"){
            constraints[index++] = {label:"farColor", data:element};
        }
        
        let division = document.querySelector("#Division").value;

        console.log(division);
        console.log(constraints);
        
        find(division, constraints);
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