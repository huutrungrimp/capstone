import { Container, Row, Col } from "react-bootstrap";
import RecoveryMap from "../maps/RecoveryMap";
import RecoveryGraph from "../graphs/RecoveryGraph";

const Recovery = ({ recovery }) => {
  console.log(recovery)
  return (
    <div className="container">
      <div>
        <h5>Global Recovery</h5>
        <div>
          <Container>
            <Row>
              <Col sm>
                {recovery === undefined ? (
                  ""
                ) : (
                  <RecoveryMap recovery={recovery} />
                )}
              </Col>
              <Col sm>
                <RecoveryGraph />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
