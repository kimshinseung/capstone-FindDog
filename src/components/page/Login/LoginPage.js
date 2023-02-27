/**
 * ./src/components/page/Login/LoginPage.js
 * 로그인 페이지
 */

import "./LoginPage.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";

const LoginPage = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth();
    const navigate = useNavigate();

    const LoginHandler = e => {
        e.preventDefault();        

        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                //const user = userCredential.user;
                navigate("/");
            })
            .catch((error) => {
                setError(true);
            })
        })
        .catch((error) => {
            setError(true);
        });
    };

    return(
        <>
        <div className="login">
            <form onSubmit = {LoginHandler}>
                <input type="email" placeholder="email" onChange={(e=>setEmail(e.target.value))} />
                <input type="password" placeholder="password" onChange={(e=>setPassword(e.target.value))}/>
                <button type="submit">Login</button>
                { error && <span>잘못된 이메일 혹은 비밀번호입니다.</span> }
            </form>
            <div><Link to="signup">회원가입</Link></div>
        </div>
        </>
    )
}

export default LoginPage;