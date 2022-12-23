import React from "react";
import Layout from "../layouts/Layout";
import { Container, Col, Row, Button, Badge } from "react-bootstrap";
import styles from "./Detail.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import up from "./up.png";



function Detail() {
  const sid = Number(window.localStorage.getItem("id"));//접속 중인 학생 id
  const { id } = useParams(); // 전달받은 id 획득
  const [apply, setApply] = useState(false);

 

  const [prog, setProg] = useState({});

  //해당 프로그램 받아오기
  const getProg = async () => {
    axios.
    get("http://localhost:8080/program/"+id)
    .then((res)=>{
      setProg(res.data);
    })
    .catch();

  };

  //신청하기 기능
  const onClick = async() =>{
    axios.
    post("http://localhost:8080/program/apply/"+id+"/"+sid)
    .then((res)=>{
      console.log(res.data);
      alert("신청이 완료되었습니다!");
      document.location.href="/prog/"+id;
    })
    .then(counterUp)
    .catch();

  }
  //신청버튼을 누르면 counter(현재 신청자 수) 증가
  const counterUp = () =>{
    axios.
    get("http://localhost:8080/counter/"+id);
  }
  //신청했는지 안했는지 check위해
  const check = () =>{
    axios.
    get("http://localhost:8080/program/user/"+id+"/"+sid)
    .then((res)=>{
      console.log(res.data.apply);
      if(res.data.apply === true){
        setApply(true);
      }
    })
  }

  useEffect(() => {
    getProg();
    check();
    localStorage.setItem("onOff","all"); //다시 홈으로 가면 전체 프로그램 보이게
  }, []);

  const [favbtn, setFavbtn] = useState(false);





  return (
    <Layout>
      <div className={styles.container}>
        <Container className="d-grid">
        <Row className="d-flex justify-content-end mb-3">
            <FaStar
              className="d-flex justify-content-end align-items-center p-0"
              style={{ width: "30px", height: "30px" }}
              color={favbtn ? "gold" : "grey"}
              onClick={() => {
                setFavbtn((prev) => !prev);
              }}
            />
          </Row>
          <Row>
            <Col sm={6}>
              <img
                src={prog.img}
                alt="Image"
                className={styles.prog_img}
              />
            </Col>
            <Col sm={5} className="d-flex flex-column justify-content-between">
              <div>
                <h5>{prog.name}</h5>
                <p>
                  접수중 {prog.counter}명 / {prog.persons}명
                </p>
              </div>
              <div>
                <p>신청 : {prog.date} </p>
                <p>장소 : {prog.place}</p>
                <br/>
                {apply ? <Button style={{ width: "100%" }} onClick={onClick} disabled="true">신청완료</Button> 
                : <Button style={{ width: "100%" }} onClick={onClick}>신청하기</Button>}
              </div>
            </Col>
            <Col
              sm={1}
              className="d-flex flex-column justify-content-between pe-0"
            >
              <div>
                <Badge style={{width:"100%"}}>{prog.hit} hits</Badge>
                <Badge
                  className="mt-2"
                  bg="warning"
                  style={{ width: "100%", fontSize: "15px" }}
                >
                  P {prog.point} 
                  
                </Badge>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <h5>세부 내용</h5>
            <hr />
            <div>
              {prog.img2===null ? <p></p> :
              <img
              src={prog.img2}
              style={{ width: "100%" }}
            />}
              
              <p>{prog.imformation}</p>
            </div>
          </Row>
          <Row className="mt-5">
            {/* 게시자 정보 표현 형식 고안 필요 */}
            <Row style={{ width: "50%" }} className="mt-5">
          {/* 게시자 정보 표현 형식 고안 필요 */}
          <h5>게시자 정보</h5>
<hr />
<Col
sm="5"
className="d-flex flex-column align-items-center justify-content-center"
style={{ background: "rgb(246, 247, 250)", fontWeight: "600" }}
>
<div></div>
{prog.depart}
</Col>
<Col sm="7" className="d-flex flex-column align-items-center">
<ul className="m-0" style={{ listStyle: "circle" }}>
<li>ebagil@hansung.ac.kr</li>
<li>02-760-5663</li>
<li>{prog.depart}</li>
</ul>
</Col>
</Row>
          </Row>
        </Container>
      </div>
      <div style={{
                width:"50px", height: "50px",
                boxShadow:"2px 2px", borderRadius: "50%", display: "block",
                position: "fixed", bottom: "50px", right: "30px"}}>
        <a href="#"><img src={up}></img></a>
      </div>
    </Layout>
  );
}

export default Detail;
