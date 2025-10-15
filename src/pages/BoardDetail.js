import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import "./BoardDetail.css";

function BoardDetail({ user }) {

    const navigator = useNavigate();

    const [post, setPost] = useState(null); // 해당 글 아이디로 요청한 글 객체
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {id} = useParams(); // board/:id , id 파라미터 받아오기

    const loadPost = async () => { // 특정 글 id로 글 1개 불러오기
        try {
            setLoading(true);
            const res = await api.get(`/api/board/${id}`)
            setPost(res.data); //특정 글 id 객체 
            setTitle(res.data.title);
             //원본 글의 제목을 수정화면에 표시하는 변수인 title 변수에 저장
            setContent(res.data.content);
             //원본 글의 내용을 수정화면에 표시하는 변수인 content 변수에 저장

        } catch (err) {
            console.error(err);
            setError("해당 게시글은 존재하지 않습니다.")
            //alert("해당 게시글은 존재하지 않습니다.")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPost();
    },[id]);

    const handelDelete = async() => {
        if(!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }
        try {
            await api.delete(`/api/board/${id}`);
            alert("게시글 삭제 성공!");
            navigator("/board");
        } catch (err) {
            console.error(err);
            if(err.response.status === 403){
                alert("삭제 권한이 없습니다.");
            } else {
                alert("삭제 실패!");
            }

        }
    }

    const handleUpdate = async() => {
        try {
            const res = await api.put(`/api/board/${id}`,{title,content});
            alert("수정 완료!");
            setPost(res.data);
            setEditing(false);
        } catch (err) {
            console.error(err);
            if(err.response.status === 403){
                alert("수정 권한이 없습니다.");
            } else {
                alert("수정 실패!");
            }
        }
    };

    if(loading) return <p>게시글 로딩중 ...</p>;
    if(error) return <p style={{color:"red"}} >{error}</p>
    if(!post) return <p style={{color:"red"}}>게시글이 존재하지않습니다.</p>

    //로그인상태이면서, 로그인한 유저와 글을 쓴 유저가 같을때 -> 참
    const isAuthor = user && user === post.author.username;

    return (
        <div className="detail-container">
             {editing ? (
                <div className="edit-form">
                    <h2>글 수정하기</h2>
                    <input type="text" value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={content}
                    onChange={(e) => setContent(e.target.value)} />
                    <div className="button-group">
                        <button className="edit-button" onClick={handleUpdate}>저장</button>
                        <button className="delete-button" onClick={() => setEditing(false)}>취소</button>
                    </div>    
                </div>
            ):(
            <>
            <h2>{post.title}</h2>
            <p className="author">작성자 : {post.author.username}</p>
            <div className="content">{post.content}</div>

            <div className="button-group">
                <button className="list-button" onClick={() => navigator("/board")}>글 목록</button>
                {/* 로그인한 유저 본인이 쓴 글만 삭제 수정 가능 */}
                {isAuthor && ( // 두개의 버튼을 묶어서 체크
                    <> 
                        <button className="edit-button" onClick={() => setEditing(true)}>수정</button>
                        <button className="delete-button" onClick={handelDelete}>삭제</button> 
                    </> 
                )}
            </div>
            </>
            )}
        </div>
    );
}

export default BoardDetail;