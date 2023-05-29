/**
 * ./src/components/page/mypage/EditMyInfo.js
 * 회원 정보 수정
 */

import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../../../style/style.css';
import './mypage.scss';
import { MainMenu } from "../../menu/Menu";
import {updateDoc, doc} from 'firebase/firestore';
import Post from '../Login/Post';
import { db } from '../../../firebase';

const EditMyInfo = () => {
    const [email, setEmail] = useState(localStorage.getItem('Email'));
    const [name, setName] = useState(localStorage.getItem('Name'));
    const [phone, setPhone] = useState(localStorage.getItem('PhoneNumber'));
    const [address, setAddress] = useState({
        address: localStorage.getItem('Address'),
        extraAddress: localStorage.getItem('ExtraAddress'),
    });
    const [openPopup, setOpenPopup] = useState(false);

    const navigate = useNavigate();

    const handleInput = (e) => {
        setFullAddress({
            ...fullAddress,
            [e.target.name]:e.target.value,
        })
    };

    const handleComplete = (data) => {
        setOpenPopup(!openPopup);
    }

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const phoneChange = (e) => {
        setPhone(e.target.value);
    }
    
    const changeHandler = async (e) => {
        e.preventDefault();

        await updateDoc(doc(db, "Users", email), {
            Name: name,
            PhoneNumber: phone,
            Address: {
                address: address.address,
                extraAddress: address.extraAddress
            }
        });

        localStorage.setItem('Name', name);
        localStorage.setItem('PhoneNumber', phone);
        localStorage.setItem('Address', address.address);
        localStorage.setItem('ExtraAddress', address.extraAddress);

        alert('정보 수정이 완료되었습니다.');
        
        navigate('/mypage/information');
    }

    return (
        <>
            <MainMenu />
            <section className="my-info-edit-board">
                <div className="my-info-edit-page">

                    <div className="my-info-edit-page2">
                        <div className="my-info-edit-title">
                            <p>🍏 회원 정보 수정 🍏</p>
                        </div>
                        <form onSubmit={changeHandler}>
                            <div className="my-info-edit-page3">
                            
                            <p>이메일: <input type="email" value={localStorage.getItem('Email')} disabled={true}/></p>
                            <p>닉네임: <input type="text" id="name" name="name" defaultValue={localStorage.getItem('Name')} onChange={nameChange}/></p>
                            <p>전화번호: <input type="text" placeholder="000-0000-0000" id="phoneNumber" name="phoneNumber" defaultValue={(localStorage.getItem('PhoneNumber') != null) ? localStorage.getItem('PhoneNumber') : ""} onChange={phoneChange}/></p>
                            
                            주소: <input className="address" placeholder="주소"
                                    type="text" name="address"
                                    onChange={handleInput} value={((address.address != "null") && (address.Address != null)) ? address.address : ""}/>
                                <button type="button" onClick={handleComplete}>우편번호 찾기</button>
                                <br/>
                                <input className="address" placeholder="상세주소"
                                    type="text" name="extraAddress"
                                    onChange={handleInput} value={((address.extraAddress != "null") && (address.extraAddress != null)) ? address.extraAddress : ""} />
                                
                                {openPopup &&
                                    <Post company={address} setcompany={setAddress}></Post>}

                            </div>
                            <div className="my-info-edit-btn">
                                <button type="submit" className="my-info-complete">완료</button>
                            </div>
                        </form>
                    </div>

                </div>
            </section>
        </>
    )
};

export default EditMyInfo;