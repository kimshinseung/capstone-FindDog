import "./LoginPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SingupPage = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    <input type="email" placeholder="email" onChange={(e=>setEmail(e.target.value))} />
                    <input type="password" placeholder="password" onChange={(e=>setPassword(e.target.value))}/>
                    <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default SingupPage