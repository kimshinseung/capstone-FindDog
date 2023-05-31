/**
 * ./src/components/page/miss/UploadPage.js
 * 실종 등록하기
 */
//import "./UploadPage.scss";
import userInputs from "../miss/formData.js";
import { React, useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { addDoc, collection, updateDoc, doc, getDoc } from "@firebase/firestore";
import { db, storage } from "../../../firebase.js";
import { getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import "../miss/UploadPage.scss";
//import Dropzone from 'react-dropzone'



const FindUploadPage = () => {

    const [data, setData] = useState({});
    const [files, setFiles] = useState([]);
    const Imgs = Array.from(files);
    const [address, setAddress] = useState("");
    const [popup, setPopup] = useState(false);

    const Navigate = useNavigate();
    const currUser = getAuth().currentUser.uid;
    var submit = true;

    function wait(sec) {
        let start = Date.now(), now = start;
        while (now - start < sec * 1000) {
            now = Date.now();
        }
    }


    useEffect(()=>{
        const uploadFile= (file, i) => {
            const storageRef = ref(storage, file.name);
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    Imgs[i] = url;
                    console.log(url);
                });
            });
        };
        files && Array.from(files).map((file, i) => (uploadFile(file, i))); //유사배열객체라서 map함수 쓰기위해 Array.from함수 사용
    }, [files]);
    




    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });

    };


    const handler = async(e) =>{
        e.preventDefault();
        
        if(!submit) return 0;
        
        if(files[0]==null){
            alert("사진을 등록해주세요");
            return 0;
        }
        submit = false;

        //console.log(files.length);
        if(Imgs[files.length-1] == null){
            //console.log("Wait start");
            wait(files.length * 1.8);
            //console.log("Wait end");    
        }
        var time = new Date()
        const docRef = await addDoc(collection(db, "Finding"), {
            ...data,
            imgs: Imgs, 
            uploadTime: time,
            visibled: true,
            uid: currUser
        });
        await updateDoc(docRef, {id: docRef.id}); 

        
        
        let document = await getDoc(doc(db, "Users", currUser));
        var arr = document.data().finding;

        if(arr != null){
            await updateDoc(doc(db, "Users", currUser), {
                finding: [...arr, docRef.id]
            });
        }
        else{
            await updateDoc(doc(db, "Users", currUser), {
                finding: [docRef.id]
            });
        }
        
        alert("등록되었습니다");
        Navigate("/find");
    }


    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        //fullAddress -> 전체 주소반환
        setPopup(false);
        setAddress(data.address);
        setData((prev)=>({...prev, address:data.address}));
    }

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "-590%",
        right: "-60%",
        width: "85%",
        height: "1100%",
        background : "rgba(0,0,0,0.25)",
    };




    return (
        <>
            <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />

            <div className="upload-page">
            <h2>목격 등록하기</h2>
            <div className="warning"><h4>※ 최대한 정확하고 자세히 적을수록 좋습니다.</h4></div>
            <div className="upload-page2">
                <form onSubmit = {handler}>

                    <div className="age">
                    <h4>추정 나이</h4>&emsp;
                    <input type="number" id="age" size="2" onChange={handleInput}></input>
                    </div>

                    {userInputs.map((input)=>(
                        <>
                        <div className="specify_farColor">
                            <h4>{input.label}</h4>&emsp;
                            <select id={input.id} onChange={handleInput}>
                                <option disabled selected>-------</option>
                                {input.datas.map((item)=>(
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        </>
                    ))} 

                    <div className="place">
                    <h4>목격장소</h4>&emsp;
                    {popup && <div className="postDiv"><DaumPostcode style={postCodeStyle} onComplete={handleComplete}/></div>}
                    <input type="text" id="place" onChange={handleInput} value={address}></input>
                    <input type="button" className="findplaceButton" onClick={()=>setPopup(true)} value="주소찾기"></input><br/>
                    </div>

                    <div className="kakaoId">
                    <h4>카카오톡ID</h4>&emsp;
                    <input id="kakaoId" maxLength="11" onChange={handleInput} />
                    </div>

                    <div className="date">
                    <h4>날짜 및 시간</h4>&ensp;
                    <input type="datetime-local" id="date" onChange={handleInput}/>
                    </div>

                    <div className="feature">
                    <h4>성격 및 특징</h4>&ensp;
                    <textarea cols="25" id="feature" onChange={handleInput}></textarea>
                    </div>

                    <div className="photo">
                    <h4>목격 사진</h4>&ensp;
                    <label className="input-file-btn" for="input-file">
                        </label>
                    <input type="file" multiple accept='image/*' onChange={(e)=>setFiles(e.target.files)}/>
                    {/* <form action="/target" class="dropzone" id="myDropzone"></form>
                    <script>
                        Dropzone.discover();
                        Dropzone.options.myDropzone = {
                            url: "https://httpbin.org/post",
                            method: 'post',
                        };
                    </script> */}
                    </div>
                <button className="submit-btn" type="submit">등록하기</button>
            </form>
            </div>
            </div>
        </>
    );
};

export default FindUploadPage