import { useState } from "react";


function Signup() {

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const handleSignup = () => {

    }

    return (
        <div className="form-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="아이디" value={username} 
                onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="비밀번호" value={password} 
                onChange={(e) => setPassword(e.target.value)} />    
            </form>
            <button type="submit">회원가입</button>
        </div>
    );
}

export default Signup;