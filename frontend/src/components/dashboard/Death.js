import { Container, Row, Col } from "react-bootstrap";
import DeathMap from "../maps/DeathMap";
import DeathGraph from "../graphs/DeathGraph";


const Death = ({ death }) => {
  console.log(death)
  return (
    <div className="container">
      <div>
        <h5>Global Deaths</h5>
        <div>
          <Container>
            <Row>
              <Col sm>
                {death === undefined ? "" : <DeathMap death={death} />}
              </Col>
              <Col sm>
                <DeathGraph />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Death;
