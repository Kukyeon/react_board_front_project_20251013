import { useEffect, useState } from "react";
import "./Board.css";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Board({user}){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();

    //게시판 모든 글 요청
    const loadPosts = async (page = 0) => {
        try {
            setLoading(true);
            const res = await api.get(`/api/board?page=${page}&size=10`); // 모든 글 가져오기 요청
            setPosts(res.data.posts); //posts -> 전체게시글 , 게시글의 배열
            setCurrentPage(res.data.currentPage); // 현재 페이지 번호
            setTotalPages(res.data.totalPages); // 전체 페이지 수
            setTotalItems(res.data.totalItems); //모든 글의 갯수
        } catch (err) {
            console.error(err);
            setError("게시글을 불러오는 중 실패하였습니다.");
            setPosts([]); // 게시글들의 배열을 초기화
        } finally {
            setLoading(false);
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
        loadPosts(currentPage);
    },[currentPage])

    //페이지 번호 그룹 배열 반환 함수 (10개까지만 표기)
    //ex) 총 게시글 수 : 157 -> 총 16페이지 필요 -> [1 2 3 4 5 6 7 8 9 10]
    // ▶ -> [11 12 13 14 15 16]
    const getPageNumbers = () => {
        const start = 0;
        const end = 0;
        const pages = [];
        for (let i = start ; i < end ; i++){
            pages.push[i];
        }
        return pages;
    }


    //날자 format 함수
    const formatDate = (dateString) => {
       //const date = new Date(dateString);
       return dateString.substring(0,10);
    }

    return (
        <div className="container">
            <h2>게시판</h2>
            {loading && <p>게시판 글 목록 로딩중...</p>}
            {error && <p style={{color:"red"}}>{error}</p>}
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
                            <td className="click-title" onClick={()=>navigate(`/board/${p.id}`)}>
                                {p.title}
                            </td>
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
            {/* 페이지 번호와 이동 화살표 출력 */}
            <div className="pagination">
                <button> ◀ </button>
                {getPageNumbers().map((num) => (
                    <button onClick={() => setCurrentPage(num)}>{num + 1}</button>
                )
                )}    

                <button> ▶ </button>
            </div>        

            <div className="write-button-container">
                <button onClick={handleWrite} 
                className="write-button">글쓰기</button>
            </div>
        </div>
    );
}

export default Board;