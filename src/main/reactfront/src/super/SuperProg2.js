import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const SuperProg2 = ({ index, name, stuName,point,progId }) => {



const onClick = () =>{
    finish();
    upPoint();
}
const upPoint = () =>{
    axios.
    get("http://localhost:8080/finish/point/"+stuName+"/"+point)
    .then(document.location.href="/super")

}

const finish = () =>{
    axios.
    get("http://localhost:8080/finish/"+progId)
    .then(document.location.href="/super");
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
          <Button variant="secondary" onClick={onClick}>진행 종료</Button>
        </Col>
      </Row>
    </div>
  );
};

export default SuperProg2;
