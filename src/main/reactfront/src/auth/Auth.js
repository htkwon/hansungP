import React from "react";
import Form from "react-bootstrap/Form";
import mainlogo from "./main_logo.png";
import Button from "react-bootstrap/Button";
//import { Link } from "react-router-dom";
import {useState,useEffect} from "react";
import axios from "axios";
import styles from "./Auth.module.css";


const Auth = () =>{
  //const [login,setLogin] = useState([]);
  const [stuId, setStuId] = useState(0);
  const [pw, setPw] = useState(); 
  const [wrong, setWrong] = useState(false); // 로그인 실패 시

  const onChangeId = (event)=>{
    setStuId(event.target.value);
  }
  const onChangePw = (event)=>{
    setPw(event.target.value);
  }





  //버튼 클릭 후 로그인 form을 전달하여 db로 접근하고 있으면 데이터 가져오고 없으면 실패
  const onClickLogin = ()=>{
    axios.
      post("http://localhost:8080/login",{
        sid : stuId,
        password : pw,
      })
      .then((res)=>{
        if(res.data.sid === undefined){
          setWrong(true);
          setTimeout(()=>{document.location.href="/auth"},600);
        }
        else if(res.data.sid === Number(stuId)){
            if(Number(stuId) === 7777){
              document.location.href="/super";
              return;
            }
            localStorage.setItem("id",res.data.id);
            localStorage.setItem("onOff","all");
            setWrong(false);
            document.location.href="/";
            
        }
      })
      .catch();
    };


  return (
    <div className="Auth-form-container">

      <Form className="Auth-form bg-primary bg-opacity-10">
      <div className="Auth-form-content">
        <img src={mainlogo} alt="Login" className="mb-5" />
        <Form.Group className="mt-3">
          <input
            type="text"
            className="form-control mt-1"
            placeholder="학번 또는 사번"
            value={stuId || ''}
            onChange={onChangeId}
          />
        </Form.Group>
        <Form.Group className="mt-3 mb-3">
          <input
            type="password"
            className="form-control mt-3"
            placeholder="비밀번호"
            value={pw || ''}
            onChange={onChangePw}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            className="d-grid gap-2 mt-3"
            variant="secondary"
            type="button"
            onClick={onClickLogin}
          >
            로그인
          </Button>
        </div>
        <div className="d-flex justify-content-center Auth-alert">
            {wrong ? (
              <p className="mt-3">
                아이디 또는 패스워드가 잘못 입력되었습니다.
              </p>
            ) : (
              ""
            )}
          </div>
          {/* 공간 활용 부분 */}
          <div
            className="d-flex justify-content-center align-items-center bg-opacity-50 bg-secondary rounded"
            // 높이 수정
            style={{
              height: "120px",
            }}
          >
            {/* ul 태그의 기본 margin 제거 ( m-0 ) */}
            <ul class="link" className="text-dark m-0 p-0">
              {/* 리스트 marker 아이콘으로 변경 예정 */}
              <li class="university" className={styles.university}>
                <a
                  target="_blank"
                  style={{ color: "#F2F2F2" }}
                  href="https://www.hansung.ac.kr/sites/hansung/index.do"
                >
                  한성대학교
                </a>
              </li>
              <li class="info" className={styles.info}>
                <a
                  target="_blank"
                  style={{ color: "#F2F2F2" }}
                  href="https://info.hansung.ac.kr/"
                >
                  종합정보시스템
                </a>
              </li>
              <li class="book" className={styles.book}>
                <a
                  target="_blank"
                  style={{ color: "#F2F2F2" }}
                  href="https://hsel.hansung.ac.kr/"
                >
                  학술정보관
                </a>
              </li>
              <li class="class" className={styles.class}>
                <a
                  target="_blank"
                  style={{ color: "#F2F2F2" }}
                  href="https://learn.hansung.ac.kr"
                >
                  e-class
                </a>
              </li>
            </ul>
          </div>

      </div>
    </Form>
    
  </div>
  );
}

export default Auth;