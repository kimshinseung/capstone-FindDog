/**
 * ./src/components/page/Login/LoginPage.js
 * 로그인 페이지
 */

import "./LoginPage.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getDocs, collection, query, where } from 'firebase/firestore';

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

    async function setInfo() {
        console.log("setInfo() 실행");

        const infoQuery = query(collection(db, "Users"), where("Email", "==", email || ''));
        const QuerySnapshot = await getDocs(infoQuery);
        QuerySnapshot.forEach((doc) => {
            let docs = doc.data();
            console.log("docs: ", docs);

            localStorage.clear();
            localStorage.setItem('Email', email);
            localStorage.setItem('Password', password);
            localStorage.setItem('Name', docs.Name);
            localStorage.setItem('PhoneNumber', docs.PhoneNumber);
            localStorage.setItem('Address', docs.Address.address);
            localStorage.setItem('ExtraAddress', docs.Address.extraAddress);
        })
        alert('로그인 성공!');
    }

    return(
        <>
        <div className="login">
            <form onSubmit = {LoginHandler}>
                <input type="email" placeholder="email" onChange={(e=>setEmail(e.target.value))} />
                <input type="password" placeholder="password" onChange={(e=>setPassword(e.target.value))}/>
                <button type="submit" onClick={setInfo}>Login</button>
                { error && <span>잘못된 이메일 혹은 비밀번호입니다.</span> }
            </form>
            <div><Link to="signup">회원가입</Link></div>
        </div>
        </>
    )
}

export default LoginPage;