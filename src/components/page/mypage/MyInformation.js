/**
 * ./src/components/page/mypage/MyInformation.js
 * 개인정보
 */
import React, {useEffect, useState} from 'react';
import { signOut, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../../firebase';
import { getDocs, collection, query, where, deleteDoc } from 'firebase/firestore';
import "./mypage.scss";

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
        });
    };

    async function deleteInfo() {
        const infoQuery = query(collection(db, "Users"), where("Email", "==", userInfo?.email || ''));
        const QuerySnapshot = await getDocs(infoQuery);
        if(QuerySnapshot.docs.length !== 0) {
            await deleteDoc(QuerySnapshot.docs[0].ref);
        }
    };

    // 회원 정보 수정
    const changeHandler = () => {
        navigate('/mypage/edit'); // 회원 정보 수정 페이지로 이동
    }

    // 로그아웃
    const logoutHandler = () => {
        signOut(auth); // 로그아웃
        localStorage.clear(); // 로컬 스토리지에서 유저 정보 삭제
        navigate('/');
    }

    // 회원 탈퇴
    const deleteHandler = () => {
        signOut(auth);
        
        deleteInfo(); // Firestroe 해당 회원 정보 삭제
        deleteUser(userInfo); // Auth 해당 회원 정보 삭제
        localStorage.clear();

        navigate('/');
    }

    // 내 정보로 이동
    const toInformation = () => {
        navigate('/mypage/information');
    }

    // 내 게시글로 이동
    const toPost = () => {
        navigate('/mypage/post');
    }

    return (
        <>
        <div className='my-information-page'>
            <div className="my-information">
                <div className='my-information-to-btn'>
                    <button className='myInfo-toInfo' onClick={toInformation}>내 정보</button>
                    <button className='myInfo-toPost' onClick={toPost}>내 게시글</button>
                </div>
                <hr/>
                <div className='my-information2'>
                    <div className="my-information-title">
                        <p>🍏 회원 정보 🍏</p>
                    </div>
                    <div className="my-information3">
                        <p>email: {localStorage.getItem('Email')}</p>
                        <p>name: {localStorage.getItem('Name')}</p>
                        <p>phone Number: {(localStorage.getItem('PhoneNumber') != null) ? localStorage.getItem('PhoneNumber') : ""}</p>
                        <p>Address: {`${((localStorage.getItem('Address') != "undefined") && (localStorage.getItem('Address') != null)) ? localStorage.getItem('Address') : ""} 
                        ${((localStorage.getItem('ExtraAddress') != "undefined") && (localStorage.getItem('Address') != null)) ? localStorage.getItem('ExtraAddress') : ""}`}</p>
                    </div>
                    <div className="my-information-btn">
                        <button className="myInfo-edit" onClick={changeHandler}>회원 정보 수정</button>
                        <button className="myInfo-Logout" onClick={logoutHandler}>로그아웃</button>
                        <button className="myInfo-exit" onClick={deleteHandler}>회원 탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};