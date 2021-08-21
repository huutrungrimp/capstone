import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import PostList from "../../posts/PostList";

const Home = ({ stats }) => {
  console.log(stats);
  const yesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  };
  console.log(yesterday());
  const date = yesterday();

  const getToday = date => date.toISOString().slice(0, 10);

  const total_confirm =
    stats === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR[0] === undefined
      ? ""
      : stats.CDR[0]["covid" + date];
  const new_cases =
    stats === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR[0] === undefined
      ? ""
      : stats.CDR[0]["change"];

  const total_death =
    stats === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR[1] === undefined
      ? ""
      : stats.CDR[1]["covid" + date];
  const new_deaths =
    stats === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR[1] === undefined
      ? ""
      : stats.CDR[1]["change"];

  const total_recovery =
    stats === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR[2] === undefined
      ? ""
      : stats.CDR[2]["covid" + date];
  const new_recovery =
    stats === undefined
      ? ""
      : stats.CDR === undefined
      ? ""
      : stats.CDR[2] === undefined
      ? ""
      : stats.CDR[2]["change"];

  const regionalvac =
    stats === undefined ? "" : stats.vac === undefined ? "" : stats.vac["vac1"];
  const vacByIncome =
    stats === undefined ? "" : stats.vac === undefined ? "" : stats.vac["vac2"];
  console.log(regionalvac, vacByIncome);

  return (
    <div className="container">
      <div>
        <div>
          <Container>
            <Row>
              <Col sm={7}>
                <Row style={{ paddingBottom: "2em" }}>
                  <Col sm={9}>
                    <h3>Covid At-A-Glance today {getToday(new Date())}</h3>
                  </Col>
                </Row>

                <Row style={{ paddingBottom: "2em" }}>
                  <Col sm>
                    <h5>Total Glocal Cases</h5>
                    <h3>{total_confirm}</h3>
                  </Col>

                  <Col sm>
                    <h5>Global New Cases Yesterday</h5>
                    <h3>{new_cases}</h3>
                  </Col>
                </Row>
                <Row style={{ paddingBottom: "2em" }}>
                  <Col sm>
                    <h5>Total Glocal Deaths</h5>
                    <h3 style={{ color: "red", fontWeight: 'bold' }}>{total_death}</h3>
                  </Col>
                  <Col sm>
                    <h5>Glocal New Deaths</h5>
                    <h3 style={{ color: "red", fontWeight: 'bold' }}>{new_deaths}</h3>
                  </Col>
                </Row>
                <Row style={{ paddingBottom: "2em" }}>
                  <Col sm>
                    <h5>Total recovered people</h5>
                    {(parseInt(total_recovery)===0)?(<p style={{ color: "red", fontWeight: 'bold' }}>The data has not been updated for today.</p>):(<h3>{total_recovery}</h3>)}
                  </Col>
                  <Col sm>
                    <h5>Newly recovered people</h5>
                    {(parseInt(new_recovery)===0)?(<p style={{ color: "red", fontWeight: 'bold' }}>The data has not been updated for today.</p>):(<h3>{new_recovery}</h3>)}
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <Row style={{ paddingBottom: "2em" }}>
                  <Col sm={4}>
                    <h3>Posts</h3>
                  </Col>
                </Row>
                <Row>
                  <PostList />
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Container>
            <Row>
              <Col sm={5}>
                <h5>
                  Total Vacinations in the World and by continents (Mills)
                </h5>
                <ResponsiveContainer width="95%" height={400}>
                  <BarChart
                    width={300}
                    height={300}
                    data={regionalvac}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Bar
                      dataKey="total_vaccinations"
                      fill="#b04e3a"
                      maxBarSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
              <Col sm={5}>
                <h5>Total Vacinations by income-groups (Mills)</h5>
                <ResponsiveContainer width="95%" height={400}>
                  <BarChart
                    width="50%"
                    height={300}
                    data={vacByIncome}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Bar
                      dataKey="total_vaccinations"
                      fill="#4287f5"
                      maxBarSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Home;
