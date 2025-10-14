import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./BoardWrite.css";


function BoardWrite({ user }){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        //로그인 한 유저만 글 쓰기 허용
        if(!user) {
            alert("로그인 후 이용바랍니다.");
            return;
        }


        try {
            await api.post("/api/board", {title, content});
            alert("글 작성 완료!");
            navigate("/board"); // 글 작성후 게시판 리스트로 이동
        } catch (err) {
            console.error(err);
            alert("글쓰기 실패!");
        }
    }


    return (
        <div className="write-container">
            <h2>글쓰기</h2>
            <form onSubmit={handleSubmit} className="write-form">
                <input type="text" placeholder="제목" value={title} 
                onChange={(e)=>setTitle(e.target.value)} />
                <textarea placeholder="내용" value={content}
                onChange={(e)=>setContent(e.target.value)} />
                <div className="button-group">
                    <button type="submit">등록</button>
                    <button type="button" onClick={() => navigate("/board")}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default BoardWrite;