import { Container, Row, Col } from "react-bootstrap";
import SuperProg from "./SuperProg";
import { useState, useEffect } from "react";
import SuperProg2 from "./SuperProg2";
import { AllByText } from "@testing-library/react";
import axios from "axios";

const Super = () => {

  
  const [sProgs, setSProgs] = useState([]); // 더미 데이터를 받아오는 state
  const [pProgs, setPProgs] = useState([]);


  //대기상태인 프로그램 받아오기(버튼 누르면 승인) -> 알람 가야함
  const getStandby = () =>{
    axios
    .get("http://localhost:8080/super/getStandby")  
    .then((res) => {
        setSProgs(res.data);
    })

  }
  
  // 진행 상태인 프로그램 받아오기  
  const getProgress = () => {
    axios
    .get("http://localhost:8080/super/getProgress")
    .then((res) => {
        setPProgs(res.data);
    })
    
  }
  
  

  useEffect(() => {
    getStandby(); // 데이터 획득
    getProgress();
  }, []);

  let sProgIndex = 1;
  let pProgIndex = 1;

  return (
    <Container className="p-5">
      <h1>신청 승인</h1>
      <Row
        className="mt-3 border border-dark border-start-0 border-end-0 border-bottom-0"
        style={{
          height: "70px",
          background: "lightblue",
          color: "black",
          fontWeight: "600",
        }}
      >
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="1"
        >
          <span>번호</span>
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="6"
        >
          <span>프로그램명</span>
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="3"
        >
          <span>신청자 이름</span>
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="2"
        >
          <span>승인</span>
        </Col>
      </Row>
      <Row className="d-flex flex-column">
        <div>
          {sProgs.map((sProg) => (
            <SuperProg // 필터링된 프로그램 배열의 각 오브젝트에 대해 MyProg 생성
              key={sProg.index} // 현재 더미 파일 내부에 index를 넣어둠, 추후 백엔드 작업 시 고유의 값 필요할듯 ..?
              index={sProgIndex++}
              name={sProg.progname} // 프로그램 제목
              stuName={sProg.login.name} // 학생 이름
              progId = {sProg.id}
            />
          ))}
        </div>
      </Row>
      <h1>진행 프로그램</h1>
      <Row
        className="mt-3 border border-dark border-start-0 border-end-0 border-bottom-0"
        style={{
          height: "70px",
          background: "lightblue",
          color: "black",
          fontWeight: "600",
        }}
      >
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="1"
        >
          <span>번호</span>
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="6"
        >
          <span>프로그램명</span>
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="3"
        >
          <span>진행자 이름</span>
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="2"
        >
          <span>승인</span>
        </Col>
      </Row>
      <Row className="d-flex flex-column">
        <div>
          {pProgs.map((pProg) => (
            <SuperProg2 // 필터링된 프로그램 배열의 각 오브젝트에 대해 MyProg 생성
              key={pProg.index}
              index={pProgIndex++}
              name={pProg.progname}
              stuName={pProg.login.name}
              point = {pProg.progpoint}
              progId = {pProg.id}
            />
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default Super;
