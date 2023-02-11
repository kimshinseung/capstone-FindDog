/**
 * ./src/components/page/Login/LoginPage.js
 */

import "./LoginPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const LoginHandler = e =>{
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //const user = userCredential.user;
            navigate("/");
        })
        .catch((error) => {
            setError(true);
        });
    };


    return(
        <div className="login">
            <form onSubmit = {LoginHandler}>
                <input type="email" placeholder="email" onChange={(e=>setEmail(e.target.value))} />
                <input type="password" placeholder="password" onChange={(e=>setPassword(e.target.value))}/>
                <button type="submit">Login</button>
                { error && <span>잘못된 이메일 혹은 비밀번호입니다.</span> }
            </form>
        </div>
    )
}

export default LoginPage