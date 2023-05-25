/**
 * ./src/components/page/miss/UploadPage.js
 * 실종 등록하기
 */
import "./UploadPage.scss";
import userInputs from "./formData.js";
import { React, useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { addDoc, collection, updateDoc } from "@firebase/firestore";
import { db, storage } from "../../../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import Dropzone from 'react-dropzone'



const UploadPage = () => {

    var img = 1;

    const [data, setData] = useState({});
    const [files, setFiles] = useState([]);
    const Imgs = Array.from(files);
    const [address, setAddress] = useState("");
    const [popup, setPopup] = useState(false);


    useEffect(()=>{
        const uploadFile= (file, i) => {
            //const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        Imgs[i] = downloadURL;
                        img = 0;
                    });
                }
            );
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
        var time = new Date()
        const docRef = await addDoc(collection(db, "Missing"), {
            ...data,
            imgs: Imgs, 
            uploadTime: time,
            visibled: true
        });
        await updateDoc(docRef, {id: docRef.id});   //현재 문서의 id를 필드에 다시 추가
        alert("등록되었습니다");
        location.reload();
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
        top: "-650%",
        right: "-70%",
        
        width: "90%",
        height: "1100%",
        // padding: "50px",
        background : "rgba(0,0,0,0.25)",
    };




    return (
        <>
            <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />
            
            <div className="upload-page">
            <h2>실종 등록하기</h2>
            <div className="warning"><h4>※ 최대한 정확하고 자세히 적을수록 좋습니다.</h4></div>
            <div className="upload-page2">
                <form onSubmit = {handler}>

                    <div className="name">
                    <h4>이름</h4>&emsp;
                    <input type="text" id="name" size="20" onChange={handleInput}></input>
                    </div>

                    <div className="age">
                    <h4>나이</h4>&emsp;
                    <input type="number" id="age" size="2" onChange={handleInput}></input>
                    </div>

                    {userInputs.map((input)=>(
                        <>
                        <div className="specify_farColor">
                            <h4>{input.label}</h4>&emsp;
                            <select id={input.id} onChange={handleInput}>
                                <option disabled selected></option>
                                {input.datas.map((item)=>(
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        </>
                    ))} 

                    <div className="neutering">
                    <h4>중성화 여부 |</h4>&ensp;
                    <label><input type="radio" id="neutering" name="neutering" value="yes" onChange={handleInput}/>예</label> &nbsp;
                    <label><input type="radio" id="neutering" name="neutering" value="no" onChange={handleInput}/>아니오</label>
                    </div>

                    <div className="place">
                    <h4>실종장소</h4>&emsp;
                    {popup && <div className="postDiv"><DaumPostcode className="postModal" style={postCodeStyle} onComplete={handleComplete}/></div>}
                    <input type="text" id="place" onChange={handleInput} value={address}></input>
                    <input type="button" className="missplaceButton" onClick={()=>setPopup(true)} value="주소찾기"></input><br/>
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

                    <div class="photo">
                        <h4>실종전 사진</h4>&ensp;
                        <label className="input-file-btn" for="input-file">
                        </label>
                        <input type="file" id="input-file"  multiple accept='image/*' onChange={(e)=>setFiles(e.target.files)}/>
                        {/* <form action="/target" class="dropzone" id="myDropzone"></form>
                        <script>
                            Dropzone.discover();
                            Dropzone.options.myDropzone = {
                                url: "https://httpbin.org/post",
                                method: 'post',
                            };
                        </script> */}
                    </div>    
                </form>
                </div>
                <button className="submit-btn" type="submit">등록하기</button>
            </div>
            
        </>
    );
};

export default UploadPage