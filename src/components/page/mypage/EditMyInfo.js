/**
 * ./src/components/page/mypage/EditMyInfo.js
 * 회원 정보 수정
 */

import { useNavigate } from "react-router-dom";
import '../../../style/style.css';
import './mypage.scss';
import { MainMenu } from "../../menu/Menu";

const EditMyInfo = () => {
    const navigate = useNavigate();
    
    const changeHandler = () => {
        navigate('/mypage');
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
                        <div className="my-info-edit-page3">
                            <p>email: <input value={localStorage.getItem('Email')}/></p>
                            <p>name: <input value={localStorage.getItem('Name')}/></p>
                            <p>phone Number: <input value={(localStorage.getItem('PhoneNumber') != null) ? localStorage.getItem('PhoneNumber') : ""}/></p>
                            <p>Address: <input value={`${((localStorage.getItem('Address') != "undefined") && (localStorage.getItem('Address') != null)) ? localStorage.getItem('Address') : ""} 
                        ${((localStorage.getItem('ExtraAddress') != "undefined") && (localStorage.getItem('Address') != null)) ? localStorage.getItem('ExtraAddress') : ""}`}/></p>
                        </div>
                        <div className="my-info-edit-btn">
                            <button className="my-info-complete" onClick={changeHandler}>완료</button>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
};

export default EditMyInfo;