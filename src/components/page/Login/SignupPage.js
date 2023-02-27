/**
 * ./src/components/page/Login/SignupPage.js
 * 회원가입 페이지
 */

import "./LoginPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Post from './Post';

const SingupPage = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fullAddress, setFullAddress] = useState({
        address:'',
    });

    const [openPopup, setOpenPopup] = useState(false);

    const handleInput = (e) => {
        setFullAddress({
            ...fullAddress,
            [e.target.name]:e.target.value,
        })
    }

    const handleComplete = (data) => {
        setOpenPopup(!openPopup);
    }

    const navigate = useNavigate();

    const LoginHandler = e =>{
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //const user = userCredential.user;
            navigate("/");
        })
        .catch((error) => {
            setError(true);
        });
    };

    return(
        <div className="signup">
            <form onSubmit = {LoginHandler}>                
                이메일<input type="email" placeholder="email" onChange={(e=>setEmail(e.target.value))} /><br/>
                비밀번호<input type="password" placeholder="password" onChange={(e=>setPassword(e.target.value))}/><br/>
                이름
                <input type="text" placeholder="이름" onChange={(e=>setName(e.target.value))}/><br/>
                
                주소
                <div>
                    <input className="address" placeholder="주소"
                        type="text" required={true} name="address"
                        onChange={handleInput} value={fullAddress.address}/>
                    <button type="button" onClick={handleComplete}>우편번호 찾기</button>
                    {openPopup &&
                        <Post company={fullAddress} setcompany={setFullAddress}></Post>}
                </div>
                
                <br/><br/><br/>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default SingupPage