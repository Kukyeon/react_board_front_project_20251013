import { useEffect, useState } from "react";
import "./Board.css";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Board({user}){

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    //게시판 모든 글 요청
    const loadPosts = async () => {
        try {
            const res = await api.get("/api/board"); // 모든 글 가져오기 요청
            setPosts(res.data); //posts -> 전체게시글 , 게시글의 배열
        } catch (err) {
            console.error(err);
        }
    };

    const handleWrite = () => {
        //로그인 한 유저만 글 쓰기 허용
        if(!user) {
            alert("로그인 후 이용바랍니다.");
            return;
        }
        navigate("/board/write")
    };

    useEffect(() => {
        loadPosts();
    },[])

    //날자 format 함수
    const formatDate = (dateString) => {
       //const date = new Date(dateString);
       return dateString.substring(0,10);
    }

    return (
        <div className="container">
            <h2>게시판</h2>
            <table className="board-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    { posts.length > 0 ? (
                        posts
                        .slice()
                        .reverse() // 최신글이 위로오게
                        .map((p, index) => (
                        <tr key={p.id}>
                            <td>{posts.length - index}</td>
                            <td>{p.title}</td>
                            <td>{p.author.username}</td>
                            <td>{formatDate(p.createDate)}</td>
                        </tr>
                        ))
                     ) : (
                        <tr>
                            <td colSpan="4">
                                게시물이 없습니다.
                            </td>
                        </tr>)

                    
                    }
                </tbody>
            </table>
            <div className="write-button-container">
                <button onClick={handleWrite} 
                className="write-button">글쓰기</button>
            </div>
        </div>
    );
}

export default Board;