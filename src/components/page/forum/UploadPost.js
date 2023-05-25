/**
 * ./src/components/page/posting/UploadPost.js
 * 자유 게시판 - 포스팅
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase.js";

export const UploadPost = () => {
    const [title, setTitle] = useState(''); // 게시글 제목
    const [text, setText] = useState(''); // 게시글 내용

    const navigate = useNavigate();

    const handleInput = (e) => {
        setTitle(e.target.value);
    };

    const handleTextarea = (e) => {
        setText(e.target.value);
    }
    
    const setup = async () => {
        // 제목, 작성자, 작성일, 내용
        addDoc(collection(db, "Forum"), {
            title: title,
            content: text,
            user: localStorage.getItem('Name'),
            uploadTime: new Date()
        });

        alert("게시글이 등록되었습니다");
        navigate('/forum');
    }

    return (
        <>
            <div className="">
                <h2>자유게시판 글 올리기</h2>

                    <div className="">
                        제목 <input type="text" id="title" size="20" onBlur={handleInput}></input>
                        <br/>
                        내용 <textarea rows='20' cols='50' id="content" onBlur={handleTextarea}></textarea>
                    </div>

                <button type="submit" onClick={setup}>올리기</button>
            </div>
        </>
    )
}