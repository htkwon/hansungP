import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { IoIosNotifications } from "react-icons/io";
import boogie from "./boogie_1.png";



  const onClick= () =>{
  localStorage.setItem("onOff","on");
  document.location.href="/";

}

const offClick= () =>{
  localStorage.setItem("onOff","off");
  document.location.href="/";
}

const allClick = () =>{
  localStorage.setItem("onOff","all");
  document.location.href="/";
}




const Header = () => {
  const [notify, setNotify] = useState(false);
  return (
    <header>
     
    <Navbar bg="light" expand="lg" className="p-4">
      <Container>
      <div><img src={boogie} alt="로고"></img></div> 
        <Navbar.Brand>
        <Link 
              class="fs-4 fw-bolder"
              style={{textDecoration: "none", fontWeight: "bold", color: "#000519"}}
              to={"/"}>
              비교과 PAGE
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link
              className="ms-4 me-3"
              style={{ textDecoration: "none", fontSize: "20px", fontWeight: "500", color: "#000519" }}
              to={"/"}
              onClick={allClick}
            >
              Home
            </Link>
            <Link
              className="me-4"
              style={{ textDecoration: "none", fontSize: "20px", fontWeight: "500", color: "#000519" }}
              to={"/"}
              onClick={onClick}
            >
              Online Program
            </Link>
            <Link  style={{ textDecoration: "none", fontSize: "20px", fontWeight: "500", color: "#000519" }}
             to={"/"}
             onClick={offClick}
             >
              Offline Program
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse
          style={{ height: "50px" }}
          className="justify-content-end align-items-end"
        >
          <IoIosNotifications
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "180px",
            }}
            type="button"
            onClick={() => {
              setNotify(!notify);
            }}
          />
          <Badge
            style={{
              position: "absolute",
              marginBottom: "26px",
              right: "175px",
            }}
          >
            3
          </Badge>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div
      style={
        notify
          ? {
              visibility: "visible",
              display: "flex",
              justifyContent: "end",
              marginRight: "80px",
            }
          : { visibility: "hidden" }
      }
    >
      <div
        style={{
          width: "320px",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          borderBottom: "1px solid rgba(153, 153, 153, 0.3)",
          justifyContent: "space-between",
          top: "85px",
          background: "white",
          fontSize: "12px",
          zIndex: "1",
          right: "40px",
        }}
      >
        <div className="align-self-center mt-2">
          <span style={{ color: "black", fontSize: "14px" }}>전체 알림</span>
        </div>
        <hr className="mt-1 mb-1" />
        <div className="border ">
          2022-2 대학생 온라인 폭력예방교육 프로그램 신청이 <b>참여승인</b>
          처리되었습니다.<time>2달 전</time>
        </div>
        <div className="border">
          2022-2 대학생 온라인 폭력예방교육 프로그램 신청이 <b>참여승인</b>
          처리되었습니다.<time>2달 전</time>
        </div>
        <div className="border">
          2022-2 대학생 온라인 폭력예방교육 프로그램 신청이 <b>참여승인</b>
          처리되었습니다.<time>2달 전</time>
        </div>
        <div className="border">
          2022-2 대학생 온라인 폭력예방교육 프로그램 신청이 <b>참여승인</b>
          처리되었습니다.<time>2달 전</time>
        </div>
        <div className="border">
          2022-2 대학생 온라인 폭력예방교육 프로그램 신청이 <b>참여승인</b>
          처리되었습니다.<time>2달 전</time>
        </div>
      </div>
    </div>
  </header>
);
};

export default Header;
