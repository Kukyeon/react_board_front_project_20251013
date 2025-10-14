import "./Board.css";

function Board(){
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
                    <tr>
                        <td>1</td>
                        <td>첫글제목</td>
                        <td>아이디</td>
                        <td>2025-10-14</td>
                    </tr>
                </tbody>
            </table>
            <div className="write-button-container">
                <button className="write-button">글쓰기</button>
            </div>
        </div>
    );
}

export default Board;