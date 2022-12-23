import styles from "./Prog.module.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Prog({ id, progImg, depart, name, date, persons, counter }) {
  const sid = Number(window.localStorage.getItem("id")); //사용자 id localStorage받아오기

  const [aprog, setAprog] = useState([]);

  

  //이미지 클릭하면 조회수 증가
  const onClick = async() =>{
    axios.
    get("http://localhost:8080/hit/"+id);
  }

  
  const onClickApply = async() =>{
    axios
    .post("http://localhost:8080/program/apply/"+id+"/"+sid)
    .then(alert("신청이 완료되었습니다."))
    .then(document.location.href="/")
  }

  const getProg = () =>{
    axios
    .get("http://localhost:8080/program/user/"+id+"/"+sid)
    .then((res) => {
      setAprog(res.data);
    })
  }

  useEffect(()=>{
    getProg();
  },[])



  return (
    <Card style={{ width: "17rem", height: "24rem" }}>
      {/* 이미지 클릭 시 해당하는 id의 상세 페이지로 이동 */}
      <Link to={`/prog/${id}`} onClick={onClick}>
        <Card.Img variant="top" src={progImg} alt={name} />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
        <Link
            to={`/prog/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Card.Title style={{ fontSize: "16px", fontWeight: "600" }}>
              {name}
            </Card.Title>
          </Link>
          <Card.Subtitle style={{ fontSize: "12px" }}>
            운영 : {date}
          </Card.Subtitle>
        </div>
        <div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-1" style={{ fontSize: "10px" }}>
              신청 마감 : 2022/11/06
            </p>
            <Button
              className="d-flex justify-content-center align-items-center"
              style={{ width: "100%", height: "24px", fontSize: "14px" }}
              onClick={onClickApply}
              disabled={aprog.apply ? true : false}
            >
              간편 신청
            </Button>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontSize: "14px" }}>#온라인 #개인</p>
            <p style={{ fontSize: "14px" }}>D-5</p>
          </div>
        </div>
      </Card.Body>
      <div
        className="d-flex justify-content-center align-items-center"
        style={
          { background: "aliceblue", minHeight: "20px" }}
      >
        <hr
          style={
            (persons - counter) > 0 ? {
              width: "90%",
              margin: "0",
              borderTop: "5px solid blue",
              }
              :
          {
            width: "90%",
            margin: "0",
            borderTop: "5px solid red",
          }}
        />
      </div>
    </Card>
  );
}

export default Prog;
