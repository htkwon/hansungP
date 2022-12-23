import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
const SuperProg = ({ index, name, stuName,progId }) => {

   
   //승인처리 (standby를 progress로 바꿈)
    const onClick = () =>{
        axios.
        get("http://localhost:8080/permission/"+progId)
        .then(document.location.href="/super")   
    }

  return (
    <div>
      <Row style={{ minHeight: "50px" }}>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="1"
        >
          {index}
        </Col>
        <Col
          className="d-flex align-items-center border"
          style={{ overflow: "auto" }}
          sm="6"
        >
          {name}
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="3"
        >
          {stuName}
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center border"
          sm="2"
        >
          <Button variant="primary" onClick={onClick}>신청 승인</Button>
        </Col>
      </Row>
    </div>
  );
};

export default SuperProg;
