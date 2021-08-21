import { Container, Row, Col } from "react-bootstrap";
import ConfirmMap from "../maps/ConfirmMap";
import ConfirmGraph from "../graphs/ConfirmGraph";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingPage from "./LoadingPage";


const Confirm = ({confirm}) => {
  console.log(confirm)

    return (
        <div className="container">
          <div>
            <h5>Global Confirmed Cases</h5>
            <div>
              <Container>
                <Row>
                  <Col sm>
                    {(confirm === undefined)?(<LoadingPage />):(
                      <ConfirmMap confirm={confirm} />
                    )}                    
                  </Col>
                  <Col sm>
                    <ConfirmGraph />
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      );
};

export default Confirm;
