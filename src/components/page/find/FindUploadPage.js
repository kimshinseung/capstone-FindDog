/**
 * ./src/components/page/miss/UploadPage.js
 * 실종 등록하기
 */
//import "./UploadPage.scss";
import userInputs from "../miss/formData.js";
import { React, useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { addDoc, collection, updateDoc } from "@firebase/firestore";
import { db, storage } from "../../../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import Dropzone from 'react-dropzone'



const FindUploadPage = () => {

    const [data, setData] = useState({});
    const [files, setFiles] = useState([]);
    const Imgs = Array.from(files);
    const [address, setAddress] = useState("");
    const [popup, setPopup] = useState(false);


    useEffect(()=>{
        const uploadFile= (file, i) => {
            const name = new Date().getTime() + file.name;
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
        if (Imgs[0] == null){
            Imgs[0] = "null"
        }
        const docRef = await addDoc(collection(db, "Finding"), {
            ...data,
            imgs: Imgs, 
            uploadTime: time
        });
        await updateDoc(docRef, {id: docRef.id}); 
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
        top: "10%",
        width: "500px",
        height: "600px",
        padding: "30px",
    };




    return (
        <>
            <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />

            <div className="upload-page">
                <form onSubmit = {handler}>
{/* 
                    <div>
                    <h3>이름</h3>
                    <input type="text" id="name" size="25" onChange={handleInput}></input>
                    </div><br/> */}

                    <div>
                    <h3>추정 나이</h3>
                    <input type="number" id="age" size="2" onChange={handleInput}></input>
                    </div><br/>

                    {userInputs.map((input)=>(
                        <>
                        <div>
                            <h3>{input.label}</h3>
                            <select id={input.id} onChange={handleInput}>
                                <option disabled selected>-------</option>
                                {input.datas.map((item)=>(
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <br/>
                        </>
                    ))} 
{/* 
                    <div>
                    <h3>중성화 여부</h3>
                    <label><input type="radio" id="neutering" name="neutering" value="yes" onChange={handleInput}/>예</label> &nbsp;
                    <label><input type="radio" id="neutering" name="neutering" value="no" onChange={handleInput}/>아니오</label>
                    </div><br/> */}

                    <h3>목격장소</h3>
                    {popup && <div><DaumPostcode style={postCodeStyle} onComplete={handleComplete}/></div>}
                    <input type="text" id="place" onChange={handleInput} value={address}></input>
                    <input type="button" onClick={()=>setPopup(true)} value="주소찾기"></input><br/>

                    <div>
                    <h3>카카오톡ID</h3>
                    <input id="kakaoId" maxLength="11" onChange={handleInput} />
                    </div><br/>

                    <div>
                    <h3>날짜 및 시간</h3>
                    <input type="datetime-local" id="date" onChange={handleInput}/>
                    </div><br/>

                    <div>
                    <h3>성격 및 특징</h3>
                    <textarea cols="30" rows="5" id="feature" onChange={handleInput}></textarea>
                    </div><br/>

                    <div>
                    <h3>목격 사진</h3>
                    <input type="file" multiple accept='image/*' onChange={(e)=>setFiles(e.target.files)}/>
                    {/* <form action="/target" class="dropzone" id="myDropzone"></form>
                    <script>
                        Dropzone.discover();
                        Dropzone.options.myDropzone = {
                            url: "https://httpbin.org/post",
                            method: 'post',
                        };
                    </script> */}

                    </div><br/>

                    <br/>
                    <button type="submit">등록하기</button>
                </form>
            </div>
        </>
    );
};

export default FindUploadPage