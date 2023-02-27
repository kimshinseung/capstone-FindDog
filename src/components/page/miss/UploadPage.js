/**
 * ./src/components/page/miss/UploadPage.js
 * 실종 등록하기
 */
import "./UploadPage.scss";
import { React, useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const UploadPage = () => {
    const specifyList = ["말티즈", "시바", "허스키"];
    const genderList = ["수컷", "암컷", "중성화"];
    const farColorList = ["검은색", "갈색", "하얀색"];

    const [specify, setSpecify] = useState("");
    const [gender, setGender] = useState("");
    const [farColor, setfarColor] = useState("");
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
                        //setFile(downloadURL)
                        //setFile({img:downloadURL})
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);
    

    const handlerSpecify = (e) =>{
        setSpecify(e.target.value);
    }

    const handlerGender = (e) =>{
        setGender(e.target.value);
    }

    const handlerFarColor = (e) =>{
        setfarColor(e.target.value);
    }

    const handler = async(e) =>{
        e.preventDefault();

        const res = await addDoc(collection(db, "Missing" ), {
            specify: specify,
            gender: gender,
            farColor: farColor,
            imgUrl: data.downloadURL
            //time: serverTimestamp()
        });

        console.log(res.id);
    }

    return (
        <>
            <div className="upload-page">
                <form onSubmit = {handler}>
                    <div>
                    <h3>품종</h3>
                    <select id="Specify" onChange={handlerSpecify}>
                        <option disabled selected>-------</option>
                        {specifyList.map((item)=>(
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    </div>
                    
                    <div>
                    <h3>성별</h3>
                    <select id="Male" onChange={handlerGender}>
                        <option disabled selected>-------</option>
                        {genderList.map((item)=>(
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    </div>

                    <div>
                    <h3>털색</h3>
                    <select id="FarColor" onChange={handlerFarColor}>
                        <option disabled selected>-------</option>
                        {farColorList.map((item)=>(
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    </div>

                    <h3>실종장소</h3>
                    <input type="text" cols="30"></input>

                    <h3>성격 및 특징</h3>
                    <textarea cols="30" rows="5"></textarea>

                    <h3>실종전 사진</h3>
                    {/* <input ref={inputRef} className={styles.input} type="file"
                        accept="image/*" name="file" onChange={imgFileAdd} /> */}
                    <input type="file" accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                    <br/>
                    <button type="submit">등록하기</button>
                </form>
            </div>
        </>
    );
};

export default UploadPage