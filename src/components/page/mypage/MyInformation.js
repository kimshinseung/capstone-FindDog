/**
 * ./src/components/page/mypage/MyInformation.js
 * 개인정보
 */
import React, {useEffect, useState} from 'react';
import {getAuth, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {app} from '../../../firebase';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';

const auth = getAuth(); // 현재 사용자 인증 정보 가져오기
const db = getFirestore();

export const MyInformation = () => {
    const [userInfo, setUserInfo] = useState();
    const [logIn, setLogIn] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address:''
    });

    const navigate = useNavigate();

    /**
     * 파이어베이스를 로드하는 속도보다 렌더링 속도가 빨라서
     * 사용자 정보에 null 값이 나오는 것을 방지.
     * 로그인 된 걸 확인해야 정보를 불러오게 함
     */
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                setLogIn(true);
                
            } else {
                setLogIn(false);
            }
        });

        setUserInfo(auth.currentUser); // 사용자 정보
        setInfo();
    }, []);

    async function setInfo() {
        const infoQuery = query(collection(db, "Users"), where("Email", "==", userInfo?.email || ''));
        const QuerySnapshot = await getDocs(infoQuery);
        QuerySnapshot.forEach((doc) => {
            let docs = doc.data();
            console.log("docs: ", docs);

            setUser({
                name: docs.Name,
                email: docs.Email,
                phone: docs.PhoneNumber,
                address: `${docs.Address.address} ${docs.Address.extraAddress}`
            });

            console.log("user: ", user);
        })
    }

    const logoutHandler = () => {
        signOut(auth);
        navigate('/');
    }

    return (
        <>
            <div className="my-information">
                <p>개인정보</p>
                <p>email: {localStorage.getItem('Email')}</p>
                <p>name: {localStorage.getItem('Name')}</p>
                <p>phone Number: {localStorage.getItem('PhoneNumber')}</p>
                <p>Address: {`${localStorage.getItem('Address')} ${localStorage.getItem('ExtraAddress')}`}</p>
                <button onClick={logoutHandler}>로그아웃</button>
            </div>
        </>
    );
};