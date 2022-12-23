import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { React, useState, useEffect } from "react";


function MyProg({programId,number,name,point,state, cancel }) {

  const sid = Number(window.localStorage.getItem("id")); //사용자 id localStorage받아오기
  // 번호, 제목, 포인트, 상태, 취소 가능 여부를 props로 받아옴
  
  const [show, setShow] = useState()
  
  const getState = () =>{
    if(state=="standby"){
      setShow("대기중")
    }else if(state=="progress"){
      setShow("진행중")
    }else if(state=="end"){
      setShow("종료")
    }
  }


  const onCancel = async () => {
    axios.
    get("http://localhost:8080/apply/delete/"+programId)
    .then(document.location.href="/mypage");
    
  };
  useEffect(()=>{
    getState();
  },[])

  return (
    <div>
      <Row style={{ minHeight: "80px" }}>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="1"
        >
          {number}
        </Col>
        <Col
          className="d-flex align-items-center border"
          style={{ overflow: "auto" }}
          sm="5"
        >
          {name}
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="2"
        >
          {point}
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="2"
        >
          {/* 현재는 상태 출력 시 분류를 위한 키워드를 그대로 사용, 각 분류에 대한 매핑 키워드 정의 필요 */}
          {show}
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="2"
        >
          <Button onClick={onCancel} variant="secondary" disabled={cancel}>
            신청 취소
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default MyProg;
