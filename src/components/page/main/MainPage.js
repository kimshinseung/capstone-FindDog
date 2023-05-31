/**
 * ./src/components/page/main/MainPage.js
 * 메인 홈
 */
import BannerCarousel  from "./banner";
import Explain from "./explain";
import React from "react";
import { useEffect } from "react";
import ReactPlayer from 'react-player'
import { db } from "../../../firebase.js";
import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export const MainPage = () => {
    const auth = getAuth();

    useEffect(() => {
		signUp();
	}, []);

    const signUp = async() => {
        console.log(auth.currentUser);

        if(auth.currentUser == null){
            console.log("null");
        }
        else{
            let currUser = auth.currentUser.uid;
            await updateDoc(doc(db, "Users", currUser), {
                uid: currUser
            });   
        }
    };

    return (
        <>
            <div className="main-page">
            <BannerCarousel/>
                <br/><br/>
                <div className="Bind">
                <div className="Video">
                <ReactPlayer className="video1" 
                url="https://www.youtube.com/watch?v=XMsDXtFWJ2U" 
                width="400px"
                height="225px"
                playing={false}
                muted={true}
                controls={true}
                />
                <br/><br/>
                <ReactPlayer className="video2" 
                url="https://www.youtube.com/watch?v=tIJjeCMB4Jo" 
                width="400px"
                height="225px"
                playing={false}
                muted={true}
                controls={true}
                />
                </div>
                <Explain/>
                </div>
                <br/><br/>
            </div>
        </>
    );
};