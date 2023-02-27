/**
 * ./src/components/page/miss/UploadPage.js
 * 실종 등록하기
 */
import "./UploadPage.scss";
//import userInputs from "./formData.js";
import { React, useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const UploadPage = () => {
    const inputs = ["품종", "성별", "털색"];
    const specifyList = ["말티즈", "시바", "허스키"];
    const genderList = ["수컷", "암컷", "중성화"];
    const farColorList = ["검은색", "갈색", "하얀색"];

    const [data, setData] = useState({});
    const [file, setFile] = useState("");

    useEffect(()=>{
        const uploadFile= () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev)=>({...prev, img:downloadURL}))
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);
    




    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
    };


    const handler = async(e) =>{
        e.preventDefault();
        const res = await addDoc(collection(db, "Missing" ), {
            ...data
            //time: serverTimestamp()
        });
        console.log(res.id);
    }


    return (
        <>
            <div className="upload-page">
                <form onSubmit = {handler}>

                    {/* {userInputs.map((input)=>(
                        <div>
                            <h3>{input.label}</h3>
                            <select id={input.id} onChange={handleInput}>
                                <option disabled selected>-------</option>
                                {input.datas}.map((item)=>(
                                    <option value={item} key={item}>{item}</option>
                                ))
                            </select>
                        </div>
                    ))} */}

                    <div>
                    <h3>품종</h3>
                    <select id="Specify" onChange={handleInput}>
                        <option disabled selected>-------</option>
                        {specifyList.map((item)=>(
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    </div>
                    
                    <div>
                    <h3>성별</h3>
                    <select id="Male" onChange={handleInput}>
                    <option disabled selected>-------</option>
                        {genderList.map((item)=>(
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    </div>

                    <div>
                    <h3>털색</h3>
                    <select id="FarColor" onChange={handleInput}>
                        <option disabled selected>-------</option>
                        {farColorList.map((item)=>(
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    </div>

                    <h3>실종장소</h3>
                    <input type="text" id="place" onChange={handleInput}></input>

                    <h3>성격 및 특징</h3>
                    <textarea cols="30" rows="5" id="place" onChange={handleInput}></textarea>

                    <h3>실종전 사진</h3>
                    <input type="file" accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>

                    <br/>
                    <button type="submit">등록하기</button>
                </form>
            </div>
        </>
    );
};

export default UploadPage