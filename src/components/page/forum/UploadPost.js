/**
 * ./src/components/page/posting/UploadPost.js
 * 자유 게시판 - 포스팅
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../../firebase.js";

export const UploadPost = () => {
    const [data, setData] = useState("");

    const navigate = useNavigate();

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData(value);
        // console.log(id);
        // console.log(data);
    };
    
    const setup = () => {
        addDoc(collection(db, "Forum"), {
            text: data
        });

        alert("게시글이 등록되었습니다");

        navigate('/forum');
    }

    return (
        <>
            <div className="">
                <h2>자유게시판 글 올리기</h2>
                
                    <div>
                        <textarea rows='10' cols='10' id='text' onChange={handleInput}></textarea>
                    </div>

                <button type="submit" onClick={setup}>올리기</button>
            </div>
        </>
    )
}