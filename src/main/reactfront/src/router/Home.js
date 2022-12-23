import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Prog from "../components/Prog";
import styles from "./Home.module.css";
import axios from "axios";
import artist from "./home_img/artist.png";
import engineering from "./home_img/engineering.png";
import book from "./home_img/book.png";
import future from "./home_img/future.png";
import { Link } from "react-router-dom";


const Home = () => {
  const id = Number(window.localStorage.getItem("id")); //사용자 id localStorage받아오기
  const onOff = window.localStorage.getItem("onOff"); //header에서 버튼 클릭에 따라 sessionStorage로 지정된 onOff 값 가져오기

  const [user,setUser] = useState([]); //접속한 사용자 data 객체 저장

  
  const [progs, setProgs] = useState([]);
  //const [onProgs,setOnProgs] = useState([]);
  //const [offProgs, setOffProgs] = useState([]);


//logout  
const onClick = () =>{
  document.location.href="/auth";
  localStorage.removeItem("id");
  localStorage.removeItem("onOff");
}


  //program 데이터 받아오기
  const getProgs = async () => {
   
    if(onOff==="all"){
    axios.
    get("http://localhost:8080/program")
    .then((res)=>{
      setProgs(res.data);
      
    })
    .catch();
  }

  else if(onOff==="on"){
    axios.
    get("http://localhost:8080/program/on")
    .then((res)=>{
      setProgs(res.data);
      
    })
    .catch();
  }

  else if(onOff==="off"){
    axios.
    get("http://localhost:8080/program/off")
    .then((res)=>{
      setProgs(res.data);
      
    })
    .catch();
  }
  };
  

  useEffect(() => {
    getProgs();
  
  }, []);

  //분류 검색 기능
  const [classify, setClassify] = useState("");
  const classifiedProgs =
    classify === ""
      ? progs
      : progs.filter((prog) => prog.classify === classify);

  const [search, setSearch] = useState("");
  const onChange = (e) => [setSearch(e.target.value)];
  const filterTitle = classifiedProgs.filter((p) => {
    return p.name
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase().replace(" ", ""));
  });



   
  //사용자 정보 db 받아오기 
  useEffect(()=>{
    if(localStorage.getItem("id")===null){
      document.location.href="/auth";
    }
    axios.
    get("http://localhost:8080/login/show/"+id)
    .then((res)=>{
      setUser(res.data);
    })
    .catch();
  },[])



  return (
    <Layout>
      <Container className="p-5">
        
      <Row className="mt-2 mb-5">
          <Col
            sm={9}
            className="d-flex align-items-center pe-5 ps-5 border border-5 border-primary rounded"
          >
             <div
              onClick={()=>setClassify("예술")}
              className="btn btn-outline-primary border border-3 border-primary"
              type="button"
              style={{ margin: 25 }}
            >
              <img src={artist} alt="예술"></img>
              예술
            </div>
            <div
              onClick={()=>setClassify("공학")}
              className="btn btn-outline-primary border border-3 border-primary"
              type="button"
              style={{ margin: 25 }}
            >
              <img src={engineering} alt="공학"></img>
              공학
            </div>
            <div
              onClick={()=>setClassify("문학")}
              className="btn btn-outline-primary border border-3 border-primary"
              type="button"
              style={{ margin: 25 }}
            >
              <img src={book} alt="문학"></img>
              문학
            </div>
            <div
              onClick={()=>setClassify("진로")}
              className="btn btn-outline-primary border border-3 border-primary"
              type="button"
              style={{ margin: 25 }}
            >
              <img src={future} alt="진로"></img>
              진로
            </div>
          </Col>
          <Col sm={3} className={styles.user_info}>
            <Card style={{ width: "18rem", height: "100%" }}>
              <Card.Header className="d-flex justify-content-between">
                <span style={{ color: "black", fontWeight: "600" }}>
                  내 정보
                </span>
                {<Button
                    onClick={onClick}
                  size="sm"
                  style={{
                    float:"right",
                    zIndex: 0,
                    width: "30%",
                    height: "100%",
                    fontSize: "13px",
                    background: "grey",
                    border: "0",
                  }}
                >
                  로그아웃
                </Button>}
                           </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title
                  className="d-flex justify-content-between"
                  style={{ fontSize: "15px", fontWeight: "600" }}
                >
                  <span className="align-self-center">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      {user.name}
                    </span>
                    님 | {user.department}
                  </span>
                </Card.Title>
                <Card.Subtitle style={{ fontSize: "14px" }}>
                  {user.sid}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                <span className="mt-4">
                <Link 
                    style={{ color: "black",
                             padding: "7px",
                             borderRadius: "10px",
                             background: "rgba(243, 150, 154, 0.5)",
                             fontSize: "14px",
                             }} to={`/mypage`}>
                    마이페이지
                  </Link>

                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <InputGroup className="p-0">
            <Form.Control type={search} onChange={onChange} placeholder="비교과 프로그램" style={{height: "45px"}}/>
            <Button variant="primary">검 색</Button>
          </InputGroup>
        </Row>        
        
        <Row>
          <div className={styles.progs}>
            {filterTitle.map((prog, i) => (
              <Prog
                key={i}
                id={prog.id}
                progImg={prog.img} 
                depart={prog.depart}
                name={prog.name}
                date={prog.date}
                persons={prog.persons}
                counter={prog.counter}
              />
            ))}
          </div>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
