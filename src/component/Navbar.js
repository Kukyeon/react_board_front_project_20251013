import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo" >홈페페페이지</div>
            <div className="menu">
                <Link to="/">Home</Link>
                <Link to="/board">게시판</Link>
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
                <button className="logout-btn">로그아웃</button>
            </div>
        </nav>
    );
}

export default Navbar;